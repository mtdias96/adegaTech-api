import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LatestOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllOrders(adegaId: string) {
    const data = await this.prismaService.order.findMany({
      where: {
        adega: { id: adegaId },
      },
      select: {
        reg: true,
        createdAt: true,
        status: true,
        items: {
          select: {
            quantity: true,
            price: true,
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return data;
  }
}
