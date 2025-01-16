import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

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

  findMany(findManyDto: Prisma.ProductWhereInput) {
    return this.prismaService.product.findMany({ where: findManyDto });
  }

  updateOne(
    productId: string,
    updateProductDto: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    console.log(updateProductDto, productId);
    const { price, stock, ...updateData } = updateProductDto;

    const data = {
      ...updateData,
      price: Number(price),
      stock: Number(stock),
    };
    return this.prismaService.product.update({
      where: { id: productId },
      data: data,
    });
  }

  deleteOne(deleteDto: Prisma.ProductDeleteArgs['where']) {
    return this.prismaService.product.delete({ where: deleteDto });
  }
}
