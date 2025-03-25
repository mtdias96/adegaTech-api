import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AdministrativeModule } from './modules/administrative/administrative.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { AwsModule } from './modules/aws/aws.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FinancialModule } from './modules/finantial/financial.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';
import { StockModule } from './modules/stock/stock.module';
import { S3Service } from './shared/aws/S3.service';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    AdministrativeModule,
    DatabaseModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    StockModule,
    OrdersModule,
    FinancialModule,
    SalesModule,
    AwsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    S3Service,
  ],
})
export class AppModule {}
