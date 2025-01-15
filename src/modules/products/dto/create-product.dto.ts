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
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  stock: number;

  @IsNotEmpty()
  categoryId: string;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  image: File;
}
