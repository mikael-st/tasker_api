import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { API_PORT } from './config/env.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/exception.filter';
import { ResponseFilter } from './utils/response.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new ResponseFilter());
  await app.listen(API_PORT);
}
bootstrap();
