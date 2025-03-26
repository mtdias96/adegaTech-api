import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import * as serverless from 'serverless-http';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new GlobalExceptionFilter(),
    new AllExceptionsFilter(),
  );
  app.useGlobalPipes(new ValidationPipe());

  return app;
}

export default async function handler(req, res) {
  const app = await bootstrap();
  const server = app.getHttpAdapter().getInstance();

  const serverlessHandler = serverless(server);
  return serverlessHandler(req, res);
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(async (app) => {
    await app.listen(process.env.PORT || 3000);
  });
}
