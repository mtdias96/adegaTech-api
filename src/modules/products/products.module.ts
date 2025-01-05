import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const time = new Date().getTime();

          const normalizedStr = file.originalname
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          const cleanStr = normalizedStr.replace(/\.webp$/, '');

          const sanitizedStr = cleanStr.replace(/[^a-zA-Z0-9-_()]/g, '');
          const extension = extname(file.originalname);
          const fileName = `${time}_${sanitizedStr}${extension}`;
          callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
