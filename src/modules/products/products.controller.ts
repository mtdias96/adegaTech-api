import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveAdegaId } from '../../shared/decorator/ActiveAdegaId';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async listAll(@ActiveAdegaId() adegaId: string) {
    return this.productsService.findAllByAdegaId(adegaId);
  }

  @Get('/search/:search')
  async searchProduct(
    @Param('search') search: string,
    @ActiveAdegaId() adegaId: string,
  ) {
    if (search.length === 0) {
      throw new BadGatewayException('Erro ao pesquisar');
    }
    return this.productsService.search({ search }, adegaId);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @ActiveAdegaId() adegaId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(adegaId, createProductDto);
  }

  @Put('/edit/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param() productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateProductDto.imageUrl = file.path.replace(/\\/g, '/');
    }

    const product = productId['id'];
    return this.productsService.update(product, updateProductDto);
  }

  @Delete('/:id')
  async deleteProductId(@Param() productId: string) {
    const product = productId['id'];
    return this.productsService.deleteProductId(product);
  }
}
