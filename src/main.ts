import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import environment from './environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('x-powered-by', false);
  app.set('trust proxy', true);
  app.use(cookieParser());
  await app.listen(environment.port);
}
bootstrap();
