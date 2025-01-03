import { Module } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma.service';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { AdministrativeController } from './administrative.controller';
import { AdministrativeService } from './administrative.service';

@Module({
  controllers: [AdministrativeController],
  providers: [AdministrativeService, PrismaService, UsersRepository],
})
export class AdministrativeModule {}
