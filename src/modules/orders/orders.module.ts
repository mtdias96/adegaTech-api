import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { OrdersController } from './orders.controller';
import { OrdersGateway } from './orders.gateway';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersGateway, PrismaService],
})
export class OrdersModule {}
