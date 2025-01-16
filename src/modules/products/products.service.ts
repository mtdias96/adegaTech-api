import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductsRepository } from 'src/shared/database/repositories/products.repositories';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(adegaId: string, createProductDto: CreateProductDto) {
    const { name, description, price, stock, categoryId, imageUrl } =
      createProductDto;

    const existingProduct = await this.productsRepository.findOne({
      adegaId,
      name,
    });

    if (existingProduct) {
      throw new BadRequestException(
        'The product already exists in this winery.',
      );
    }

    const productAdega = await this.productsRepository.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      imageUrl,
      category: {
        connect: {
          id: categoryId,
        },
      },
      adega: {
        connect: {
          id: adegaId,
        },
      },
    });

    return productAdega;
  }

  async findAllByAdegaId(adegaId: string) {
    //Colocar validações
    return await this.productsRepository.findMany({ adegaId });
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productsRepository.findOne({
      id: productId,
    });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    return await this.productsRepository.updateOne(productId, updateProductDto);
  }

  async deleteProductId(productId: string) {
    const existingProduct = await this.productsRepository.findOne({
      id: productId,
    });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    return await this.productsRepository.deleteOne({ id: productId });
  }
}
