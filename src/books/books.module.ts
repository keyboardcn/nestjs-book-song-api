import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { loggerMiddleware } from '../middleware/logger.middleware';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'books', method: RequestMethod.GET });
    consumer.apply(loggerMiddleware).forRoutes(BooksController);
  }
}
