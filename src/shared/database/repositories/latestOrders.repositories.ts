import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LatestOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
