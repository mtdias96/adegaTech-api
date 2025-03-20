import { Injectable } from '@nestjs/common';
import { OrderStatus, PrismaClient, type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createOrder(createDto: Prisma.OrderCreateInput, trx: PrismaClient) {
    return trx.order.create({
      data: createDto,
      include: { items: true },
    });
  }

  updateOrder(id: string, status: OrderStatus, trx: PrismaClient) {
    return trx.order.update({
      where: { id },
      data: {
        status: status,
      },
    });
  }

  findOne(findOneDto: Prisma.OrderWhereInput) {
    return this.prismaService.order.findFirst({ where: findOneDto });
  }

  async findTotalOrders(adegaId: string) {
    return this.prismaService.order.count({
      where: { adegaId },
    });
  }

  findName(id: string) {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
      },
    });
  }

  findStockByProducts(adegaId: string, productIds: string[]) {
    return this.prismaService.stock.findMany({
      where: {
        adegaId,
        productId: { in: productIds },
      },
      select: {
        productId: true,
        quantity: true,
        product: {
          select: {
            price: true,
            name: true,
          },
        },
      },
    });
  }

  updateAllSales(adegaId: string, quantity: number, trx: PrismaClient) {
    return trx.storeSalesSummary.upsert({
      where: {
        adegaId: adegaId,
      },
      update: { total: { increment: quantity } },
      create: {
        adegaId: adegaId,
        total: quantity,
      },
    });
  }
}
