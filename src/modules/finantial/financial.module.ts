import { Module } from '@nestjs/common';
import { FinacialController } from './financial.controller';
import { FinancialService } from './financial.service';

@Module({
  controllers: [FinacialController],
  providers: [FinancialService],
})
export class FinancialModule {}
