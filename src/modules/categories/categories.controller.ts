import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActiveAdegaId } from 'src/shared/decorator/ActiveAdegaId';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @ActiveAdegaId() adegaId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.createCategory(adegaId, createCategoryDto);
  }

  @Get()
  findAll(@ActiveAdegaId() adegaId: string) {
    return this.categoriesService.findAllByAdegaId(adegaId);
  }
}
