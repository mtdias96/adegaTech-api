import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(14)
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
}
