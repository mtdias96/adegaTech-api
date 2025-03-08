import { Injectable } from '@nestjs/common';
import { FinancialRepository } from 'src/shared/database/repositories/financial.repositories';

@Injectable()
export class FinantialService {
  constructor(private readonly financialRepository: FinancialRepository) {}
  async findAll(adegaId: string) {
    const finantialValues =
      await this.financialRepository.findAllFinancial(adegaId);

    const totalValue = finantialValues
      .map((value) => value.totalSales)
      .reduce((v1, v2) => {
        return v1 + v2;
      }, 0);

    return { total: totalValue };
  }
}
