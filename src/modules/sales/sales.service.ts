import { Injectable } from '@nestjs/common';
import { FinancialRepository } from 'src/shared/database/repositories/financial.repositories';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repositories';
import { SalesRepository } from 'src/shared/database/repositories/sales.repositories';
import { Order, OrderItem } from './dto/sales.dto';

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly financialRepository: FinancialRepository,
    private readonly orderRepository: OrdersRepository,
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

  async findBestSellingProducts(adegaId) {
    const productCount = new Map();

    const orders = await this.orderRepository.findAllOrders(adegaId);

    orders.forEach((order) => {
      if (order.status !== 'COMPLETED') return;
      order.items.forEach((item) => {
        const productId = item.product.id;
        const productName = item.product.name;
        const productImageUrl = item.product.imageUrl;
        const productPrice = item.product.price;

        productCount.set(productId, {
          productPrice: productPrice,
          imageUrl: productImageUrl,
          name: productName,
          count: (productCount.get(productId)?.count || 0) + item.quantity,
        });
      });
    });

    return [...productCount.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([productId, data]) => ({
        productId,
        name: data.name,
        count: data.count,
        imageUrl: data.imageUrl,
        price: data.productPrice,
      }));
  }
}
