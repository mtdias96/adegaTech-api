import { Injectable } from '@nestjs/common';
import { FinancialRecord, PrismaClient, type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FinancialRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createFinancialTransition(
    finanacialDto: Prisma.FinancialRecordCreateInput,
    trx: PrismaClient,
  ) {
    return trx.financialRecord.create({
      data: {
        ...finanacialDto,
      },
    });
  }

  async findAllFinancial(adegaId: string) {
    return this.prismaService.financialRecord.findMany({
      where: { adegaId: adegaId },
      select: {
        totalSales: true,
        date: true,
      },
    });
  }

  async getSaleCurrentDay(
    adegaId: string,
    startedDay: Date,
    endDay: Date,
  ): Promise<FinancialRecord[]> {
    return this.prismaService.financialRecord.findMany({
      where: {
        adegaId,
        date: {
          gte: startedDay,
          lt: endDay,
        },
      },
    });
  }

  async getSaleWeek(
    adegaId: string,
    startedDay: Date,
    endDay: Date,
  ): Promise<FinancialRecord[]> {
    return this.prismaService.financialRecord.findMany({
      where: {
        adegaId,
        date: {
          gte: startedDay,
          lt: endDay,
        },
      },
    });
  }

  async getSaleMonth(
    adegaId: string,
    startedDay: Date,
    endDay: Date,
  ): Promise<FinancialRecord[]> {
    return this.prismaService.financialRecord.findMany({
      where: {
        adegaId,
        date: {
          gte: startedDay,
          lt: endDay,
        },
      },
    });
  }

  async getTicket(adegaId: string) {
    return this.prismaService.order.aggregate({
      where: { adegaId },
      _sum: { total: true },
    });
  }

  async getSalesByCategory(adegaId: string) {
    return this.prismaService.order.findMany({
      where: { adegaId },
      include: {
        items: {
          include: {
            product: {
              select: {
                category: true,
              },
            },
          },
        },
      },
    });
  }
}
