import { Controller, Get, Query } from '@nestjs/common';
import { ActiveAdegaId } from 'src/shared/decorator/ActiveAdegaId';
import { FinancialResponseDto } from './dto/finantialDto';
import { FinancialService } from './financial.service';

@Controller('financial')
export class FinacialController {
  constructor(private readonly financialService: FinancialService) {}

  @Get()
  async getFinancialData(
    @ActiveAdegaId() adegaId: string,
    @Query('include') include: string[],
  ) {
    const financial: FinancialResponseDto = {};

    if (include.includes('day')) {
      financial.day = await this.financialService.findCurrentDay(adegaId);
    }

    if (include.includes('week')) {
      financial.week = await this.financialService.findCurrentWeek(adegaId);
    }

    if (include.includes('month')) {
      financial.month = await this.financialService.findCurrentMonth(adegaId);
    }

    if (include.includes('total')) {
      financial.total = await this.financialService.findAll(adegaId);
    }

    return financial;
  }

  @Get('averageTicket')
  async getAverageTicket(@ActiveAdegaId() adegaId: string) {
    return this.financialService.calculateAverageTicket(adegaId);
  }
}
