import { Injectable } from '@nestjs/common';
import { PrismaClient, type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FinancialRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createFinancialTransition(
    finanacialDto: Prisma.FinancialRecordCreateInput,
    trx: PrismaClient,
  ) {
    return trx.financialRecord.create({
      data: {
        ...finanacialDto,
      },
    });
  }

  findAllFinancial(adegaId: string) {
    return this.prismaService.financialRecord.findMany({
      where: { adegaId: adegaId },
      select: {
        totalSales: true,
        date: true,
      },
    });
  }
}
