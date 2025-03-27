import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './shared/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: env.FRONT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('dashboard');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
