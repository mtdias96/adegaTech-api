import { PartialType } from '@nestjs/mapped-types';
import { CreateLatestOrderDto } from './create-latest-order.dto';

export class UpdateLatestOrderDto extends PartialType(CreateLatestOrderDto) {}
