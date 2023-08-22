import { INestApplication } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '../app.module';
import { HttpExceptionFilter } from '../helpers/exception-filter/http.exception.filter';
import { GlobalValidationPipe } from '../interceptors/pipes/global.validation.pipe';

import { SwaggerConfig } from './swagger/swagger';

export const initApp = (app: INestApplication): INestApplication => {
  app.enableCors({
    credentials: true,
    origin: true
  });

  app.useGlobalPipes(GlobalValidationPipe);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());

  SwaggerConfig.create(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return app;
};
