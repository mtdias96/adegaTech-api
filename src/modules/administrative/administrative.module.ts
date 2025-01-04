import { Module } from '@nestjs/common';

import { AdministrativeController } from './administrative.controller';
import { AdministrativeService } from './administrative.service';

@Module({
  controllers: [AdministrativeController],
  providers: [AdministrativeService],
})
export class AdministrativeModule {}
