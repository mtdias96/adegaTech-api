import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BaseService, PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class StocksRepository extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findMany(adegaId: string) {
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
