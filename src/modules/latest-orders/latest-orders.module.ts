import { Module } from '@nestjs/common';
import { LatestOrdersController } from './latest-orders.controller';
import { LatestOrdersService } from './latest-orders.service';

@Module({
  controllers: [LatestOrdersController],
  providers: [LatestOrdersService],
})
export class LatestOrdersModule {}
