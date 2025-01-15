import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories.repositories';
import { ProductsRepository } from './repositories/products.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    ProductsRepository,
  ],
  exports: [UsersRepository, CategoriesRepository, ProductsRepository],
})
export class DatabaseModule {}
