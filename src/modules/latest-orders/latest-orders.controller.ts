import { Controller, Get } from '@nestjs/common';
import { ActiveAdegaId } from 'src/shared/decorator/ActiveAdegaId';
import { LatestOrdersService } from './latest-orders.service';

@Controller('latest-orders')
export class LatestOrdersController {
  constructor(private readonly latestOrdersService: LatestOrdersService) {}

  @Get()
  findAll(@ActiveAdegaId() adegaId: string) {
    return this.latestOrdersService.findAll(adegaId);
  }
}
