import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({ data: createDto });
  }

  findOne(findOneDto: Prisma.CategoryWhereInput) {
    return this.prismaService.category.findFirst({ where: findOneDto });
  }

  findMany(findOneDto: Prisma.CategoryWhereInput) {
    return this.prismaService.category.findMany({ where: findOneDto });
  }
}
