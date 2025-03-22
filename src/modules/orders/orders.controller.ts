import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActiveAdegaId } from 'src/shared/decorator/ActiveAdegaId';
import { ActiveUserId } from 'src/shared/decorator/ActiveUserId';
import { ItemsDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: ItemsDto,
    @ActiveAdegaId() adegaId: string,
    @ActiveUserId() userId: string,
  ) {
    return this.ordersService.create(createOrderDto, adegaId, userId);
  }

  @Get('latest-orders')
  findAll(@ActiveAdegaId() adegaId: string) {
    return this.ordersService.findAll(adegaId);
  }
}
