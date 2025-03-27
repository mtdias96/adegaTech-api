import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
//Decidir se ira usar esse padrão para injetar o id da adega na query ou colocar manualmente
export class BaseService {
  constructor(protected readonly prisma: PrismaService) {}

  protected addAdegaFilter<T extends { where?: any; include?: any }>(
    adegaId: string,
    options: T,
  ): T {
    return {
      ...options,
      where: {
        ...options.where,
        adegaId,
      },
    };
  }
}
