import { Controller, Get } from '@nestjs/common';
import { ActiveAdegaId } from 'src/shared/decorator/ActiveAdegaId';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('total-sales')
  findAll(@ActiveAdegaId() adegaId: string) {
    return this.salesService.findAll(adegaId);
  }

  @Get('sales-category')
  findSalesCategory(@ActiveAdegaId() adegaId: string) {
    return this.salesService.findSalesCategory(adegaId);
  }
}
