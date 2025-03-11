import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories.repositories';
import { FinancialRepository } from './repositories/financial.repositories';
import { OrdersRepository } from './repositories/orders.repositories';
import { ProductsRepository } from './repositories/products.repositories';
import { StocksRepository } from './repositories/stock.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    ProductsRepository,
    StocksRepository,
    OrdersRepository,
    FinancialRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    ProductsRepository,
    StocksRepository,
    OrdersRepository,
    FinancialRepository,
  ],
})
export class DatabaseModule {}
