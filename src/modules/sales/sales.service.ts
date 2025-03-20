import { Injectable } from '@nestjs/common';
import { FinancialRepository } from 'src/shared/database/repositories/financial.repositories';
import { SalesRepository } from 'src/shared/database/repositories/sales.repositories';
import { Order, OrderItem } from './dto/sales.dto';

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly financialRepository: FinancialRepository,
  ) {}
  findAll(adegaId: string) {
    return this.salesRepository.getAllSales(adegaId);
  }

  async findSalesCategory(adegaId: string) {
    const orders: Order[] =
      await this.financialRepository.getSalesByCategory(adegaId);

    const salesByCategory: Record<string, number> = orders.reduce(
      (acc: Record<string, number>, order: Order) => {
        order.items.forEach((item: OrderItem) => {
          const categoryName = item.product.category.name;
          acc[categoryName] = (acc[categoryName] || 0) + item.quantity;
        });
        return acc;
      },
      {},
    );

    const totalSales = Object.values(salesByCategory).reduce(
      (sum: number, qty: number) => sum + qty,
      0,
    );

    const percentageByCategory: Record<string, number> = Object.entries(
      salesByCategory,
    ).reduce((acc: Record<string, number>, [category, qty]) => {
      acc[category] = Math.round((qty / totalSales) * 100);
      return acc;
    }, {});

    return { percentageByCategory, totalSales };
  }
}
