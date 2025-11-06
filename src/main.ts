import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels: ['error', 'warn', 'debug', 'fatal', 'log'],
      json: false,
    }),
  });
  // Two ways to set global prefix with versioning
  /**
   * Way 1: set global prefix with version in URI
   * app.setGlobalPrefix('api/v1');
   *   app.enableVersioning({
   *    type:  VersioningType.URI,
   *   })
   * then call api with url like: /api/v1/authors;
   *  */
  /**
   * Way 2: set global prefix with version in custom header
   * as we did in AuthorsController with @Controller({path: 'authors',  version: 'v1' })
   * then call api with header 'Custom-Header': 'v1'
   */

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Custom-Header',
  });

  app.use(cookieParser('mysecret'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
