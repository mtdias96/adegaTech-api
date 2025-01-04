import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AdministrativeModule } from './modules/administrative/administrative.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [AdministrativeModule, DatabaseModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
