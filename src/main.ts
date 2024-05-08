import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { API_PORT } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(API_PORT);
}
bootstrap();
