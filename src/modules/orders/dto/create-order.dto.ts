import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';

class Item {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class ItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}
