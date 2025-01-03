import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdministrativeModule } from './modules/administrative/administrative.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AdministrativeModule,
  ],
})
export class AppModule {}
