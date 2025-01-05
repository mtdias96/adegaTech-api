import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveAdegaId } from 'src/shared/decorator/ActiveAdegaId';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @ActiveAdegaId() adegaId: string,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createProductDto.imageUrl = file.path.replace(/\\/g, '/');
    return this.productsService.create(adegaId, createProductDto);
  }
}
