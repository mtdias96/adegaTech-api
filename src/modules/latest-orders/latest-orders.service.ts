import { Injectable } from '@nestjs/common';
import { LatestOrdersRepository } from 'src/shared/database/repositories/latestOrders.repositories';

@Injectable()
export class LatestOrdersService {
  constructor(private readonly laestOrdersRepository: LatestOrdersRepository) {}

  async findAll(adegaId: string) {
    const data = await this.laestOrdersRepository.findAllOrders(adegaId);

    return { data };
  }
}
