import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'price must be a number' })
  @IsNotEmpty({ message: 'price is required' })
  @Min(0, { message: 'price must not be less than 0' })
  price: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'stock must be a number' })
  @IsNotEmpty({ message: 'stock is required' })
  @Min(0, { message: 'stock must not be less than 0' })
  stock: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'lowStock must be a number' })
  @IsNotEmpty({ message: 'lowStock is required' })
  @Min(0, { message: 'lowStock must not be less than 0' })
  lowStock: number;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  image: File;
}
