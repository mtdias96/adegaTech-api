import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { ProductsRepository } from 'src/shared/database/repositories/products.repositories';
import { CatchDbErrors } from 'src/shared/decorator/CatchDBErrors';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(adegaId: string, createProductDto: CreateProductDto) {
    try {
      const {
        name,
        description,
        price,
        stock,
        lowStock,
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
        quantity: Number(stock),
        lowStock: Number(lowStock),
        adega: {
          connect: {
            id: adegaId,
          },
        },

        product: {
          connect: {
            id: productAdega.id,
          },
        },
      });

      return { productAdega, productStock };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error occurred:', error.code, error.meta);
      }
    }
  }
  //Pensar em nome melhor
  async findAllByAdegaId(adegaId: string) {
    try {
      const adegaExists = await this.productsRepository.findOne({
        adegaId,
      });

      if (!adegaExists) {
        throw new Error('Adega não encontrada');
      }

      return await this.productsRepository.findMany({
        adegaId,
      });
    } catch (error) {
      throw new BadRequestException('Erro ao buscar produtos', error);
    }
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
        select: {
          stock: true,
          category: true,
          price: true,
          imageUrl: true,
          name: true,
        },
      });

      return productSearch;
    } catch {
      throw new BadRequestException('Erro ao buscar produtos');
    }
  }

  @CatchDbErrors()
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
