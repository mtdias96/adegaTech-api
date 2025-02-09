import { Controller, Get } from '@nestjs/common';
import { ActiveAdegaId } from 'src/shared/decorator/ActiveAdegaId';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  findAll(@ActiveAdegaId() adegaId: string) {
    return this.stockService.findAll(adegaId);
  }

  @Get('low')
  findLowStock(@ActiveAdegaId() adegaId: string) {
    return this.stockService.findLowStock(adegaId);
  }
}
