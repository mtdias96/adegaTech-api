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
    const {
      name,
      description,
      price,
      stock: quantity,
      categoryId,
      imageUrl,
    } = createProductDto;

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

    const productStock = await this.productsRepository.createStock({
      quantity: Number(quantity),
      product: {
        connect: {
          id: productAdega.id,
        },
      },
    });

    return { productAdega, productStock };
  }

  async findAllByAdegaId(adegaId: string) {
    const adegaExists = await this.productsRepository.findOne({
      adegaId,
    });

    if (!adegaExists) {
      throw new Error('Adega não encontrada');
    }

    return await this.productsRepository.findMany({
      adegaId,
    });
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { price, name, imageUrl, image, categoryId, description, id } =
      updateProductDto;

    const existingProduct = await this.productsRepository.findOne({
      id: productId,
    });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const data = {
      name,
      imageUrl,
      image,
      categoryId,
      description,
      id,
      price: Number(price),
    };

    return await this.productsRepository.updateOne(productId, data);
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

  async search(searchDto: { search: string }, adegaId: string) {
    try {
      const searchWords = searchDto.search.split(' ').filter(Boolean);

      const productSearch = await this.productsRepository.findSearch({
        where: {
          adegaId,
          AND: searchWords.map((word) => ({
            name: {
              contains: word,
              mode: 'insensitive',
            },
          })),
        },
        orderBy: {
          name: 'asc',
        },
      });

      return productSearch;
    } catch {
      throw new BadRequestException('Erro ao buscar produtos');
    }
  }
}
