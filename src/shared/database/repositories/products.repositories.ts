import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ProductCreateInput) {
    return this.prismaService.product.create({ data: createDto });
  }

  findOne(findOneDto: Prisma.ProductWhereInput) {
    return this.prismaService.product.findFirst({ where: findOneDto });
  }

  findMany(findOneDto: Prisma.ProductWhereInput) {
    return this.prismaService.product.findMany({ where: findOneDto });
  }
}
