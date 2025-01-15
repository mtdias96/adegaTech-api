import { IsNotEmpty, IsString } from 'class-validator';

export class ListProductByCategoryDto {
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
