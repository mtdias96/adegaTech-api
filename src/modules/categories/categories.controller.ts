import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActiveAdegaId } from '../../shared/decorator/ActiveAdegaId';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ListProductByCategoryDto } from './dto/list-product-category.dto';

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

  @Get('/:categoryId/products')
  findOne(
    @ActiveAdegaId() adegaId: string,
    @Param() listProductByCategoryDto: ListProductByCategoryDto,
  ) {
    return this.categoriesService.listProductsByCategory(
      adegaId,
      listProductByCategoryDto,
    );
  }
}
