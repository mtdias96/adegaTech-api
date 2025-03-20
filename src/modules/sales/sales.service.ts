import { Injectable } from '@nestjs/common';
import { SalesRepository } from 'src/shared/database/repositories/sales.repositories';

@Injectable()
export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}
  findAll(adegaId: string) {
    return this.salesRepository.getAllSales(adegaId);
  }
}
