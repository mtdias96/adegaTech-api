import { Injectable } from '@nestjs/common';
import { FinancialRecord } from '@prisma/client';
import { FinancialRepository } from '../../shared/database/repositories/financial.repositories';
import { OrdersRepository } from '../../shared/database/repositories/orders.repositories';

@Injectable()
export class FinancialService {
  constructor(
    private readonly financialRepository: FinancialRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async findAll(adegaId: string) {
    const finantialValues =
      await this.financialRepository.findAllFinancial(adegaId);

    const financialTotal = finantialValues
      .map((value) => value.totalSales)
      .reduce((v1, v2) => {
        return v1 + v2;
      }, 0);

    return { financialTotal };
  }

  async findCurrentDay(adegaId: string) {
    const now = new Date();

    const startedDay = this.getStartOfDayUTC(now);
    const endDay = this.getEndOfDayUTC(now);

    const currentDayData = await this.financialRepository.getSaleCurrentDay(
      adegaId,
      startedDay,
      endDay,
    );

    const financialCurrentDay = currentDayData.reduce(
      (total, record) => total + record.totalSales,
      0,
    );

    return { financialCurrentDay };
  }

  async findCurrentWeek(adegaId: string) {
    const agora = new Date();
    const { startOfWeek, endOfWeek } = this.getWeekRangeUTC(agora);

    const weekData: FinancialRecord[] =
      await this.financialRepository.getSaleWeek(
        adegaId,
        startOfWeek,
        endOfWeek,
      );

    const financialCurrentWeek = weekData.reduce(
      (total, record) => total + record.totalSales,
      0,
    );

    return { financialCurrentWeek };
  }

  async findCurrentMonth(adegaId: string) {
    const agora = new Date();
    const { startOfMonth, endOfMonth } = this.getMonthRangeUTC(agora);

    const monthData: FinancialRecord[] =
      await this.financialRepository.getSaleMonth(
        adegaId,
        startOfMonth,
        endOfMonth,
      );

    const financialCurrentMonth = monthData.reduce(
      (total, record) => total + record.totalSales,
      0,
    );

    return { financialCurrentMonth };
  }

  async calculateAverageTicket(adegaId: string) {
    const totalInvoicing = await this.financialRepository.getTicket(adegaId);

    const totalOrders = await this.ordersRepository.findTotalOrders(adegaId);

    const orders = await this.financialRepository.getSalesByCategory(adegaId);

    const averageTicket = (
      (totalInvoicing._sum.total || 0) / totalOrders
    ).toFixed(2);

    const salesByCategory = orders.reduce(
      (acc, order) => {
        order.items.forEach((item) => {
          const totalItem = item.price * item.quantity;
          const categoryName = item.product.category.name;

          if (acc[categoryName]) {
            acc[categoryName] += totalItem;
          } else {
            acc[categoryName] = totalItem;
          }
        });
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      averageTicket,
      salesByCategory: Object.entries(salesByCategory).map(
        ([category, totalSales]) => ({
          category,
          totalSales: totalSales.toFixed(2),
        }),
      ),
    };
  }

  private getStartOfDayUTC(date: Date): Date {
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
  }

  private getEndOfDayUTC(date: Date): Date {
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() + 1,
      ),
    );
  }

  private getWeekRangeUTC(date: Date): { startOfWeek: Date; endOfWeek: Date } {
    const dayOfWeek = date.getUTCDay(); // 0 = domingo, 1 = segunda, ...
    // Se for domingo, desloca para a última segunda; caso contrário, calcula o deslocamento para segunda
    const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startOfWeek = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() + offset,
      ),
    );
    const endOfWeek = new Date(
      Date.UTC(
        startOfWeek.getUTCFullYear(),
        startOfWeek.getUTCMonth(),
        startOfWeek.getUTCDate() + 7,
      ),
    );
    return { startOfWeek, endOfWeek };
  }

  private getMonthRangeUTC(date: Date): {
    startOfMonth: Date;
    endOfMonth: Date;
  } {
    const startOfMonth = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1),
    );

    const endOfMonth = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1),
    );
    return { startOfMonth, endOfMonth };
  }
}
