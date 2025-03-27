import { Injectable } from '@nestjs/common';
import { PrismaClient, Stock } from '@prisma/client';
import { BaseService, PrismaService } from '../prisma.service';

export type StockWithProduct = Stock & {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
  adega: {
    categories: any[];
  };
};

@Injectable()
export class StocksRepository extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findMany(adegaId: string): Promise<StockWithProduct[]> {
    const options = this.addAdegaFilter(adegaId, {
      include: {
        product: true,
        adega: {
          select: {
            categories: true,
          },
        },
      },
    });

    return await this.prisma.stock.findMany(options);
  }

  async updateStockAfterSale(
    cartItems: {
      productId: string;
      quantity: number;
    }[],
    trx: PrismaClient,
  ) {
    const items = Array.isArray(cartItems) ? cartItems : [cartItems];

    await Promise.all(
      items.map((item) =>
        trx.stock.update({
          where: { productId: item.productId },
          data: {
            quantity: { decrement: item.quantity },
          },
        }),
      ),
    );
  }
}
