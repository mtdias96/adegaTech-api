import { Injectable } from '@nestjs/common';
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
}
