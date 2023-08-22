import * as process from 'process';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { initApp } from './utils/init.app';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initApp(app);

  await app.listen(PORT || 5001);
}

bootstrap();
