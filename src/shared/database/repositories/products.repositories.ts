import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ProductCreateInput) {
    return this.prismaService.product.create({ data: createDto });
  }

  createStock(createDto: Prisma.StockCreateInput) {
    return this.prismaService.stock.create({ data: createDto });
  }

  findOne(findOneDto: Prisma.ProductWhereInput) {
    return this.prismaService.product.findFirst({ where: findOneDto });
  }

  findMany(findManyAdegaIdDto: Prisma.ProductWhereInput) {
    return this.prismaService.product.findMany({
      where: findManyAdegaIdDto,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        stock: {
          select: {
            quantity: true,
            lowStock: true,
          },
        },
      },
    });
  }

  findSearch(findSearchDto: Prisma.ProductFindManyArgs) {
    return this.prismaService.product.findMany(findSearchDto);
  }

  updateOne(
    productId: string,
    updateProductDto: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id: productId },
      data: updateProductDto,
    });
  }

  deleteOne(deleteDto: Prisma.ProductDeleteArgs['where']) {
    return this.prismaService.product.delete({ where: deleteDto });
  }
}
