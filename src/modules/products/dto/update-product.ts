import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  image: File;
}
