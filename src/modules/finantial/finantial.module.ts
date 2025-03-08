import { Module } from '@nestjs/common';
import { FinantialController } from './finantial.controller';
import { FinantialService } from './finantial.service';

@Module({
  controllers: [FinantialController],
  providers: [FinantialService],
})
export class FinantialModule {}
