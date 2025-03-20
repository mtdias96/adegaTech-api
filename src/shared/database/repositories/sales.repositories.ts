import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SalesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAllSales(adegaId: string) {
    return this.prismaService.storeSalesSummary.findUnique({
      where: {
        adegaId: adegaId,
      },
      select: {
        total: true,
      },
    });
  }
}
