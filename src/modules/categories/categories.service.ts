import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(adegaId: string, categoryDto: CreateCategoryDto) {
    const { name, icon } = categoryDto;

    const existingCategory = await this.categoriesRepository.findOne({
      adegaId,
      name,
    });

    if (existingCategory) {
      throw new BadRequestException(
        'The category already exists in this winery.',
      );
    }

    const categoryAdega = await this.categoriesRepository.create({
      name,
      icon,
      adega: {
        connect: {
          id: adegaId,
        },
      },
    });

    return categoryAdega;
  }

  findAllByAdegaId(adegaId: string) {
    //Colocar validações
    return this.categoriesRepository.findMany({ adegaId });
  }
}
