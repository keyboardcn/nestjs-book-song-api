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
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from 'src/models/book.model';
import { Author } from 'src/models/author.model';
import { AuthorsService } from 'src/authors/authors.service';
import { AuthorsController } from 'src/authors/authors.controller';
import { User } from 'src/models/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/caslAbility.module';

@Module({
  imports: [SequelizeModule.forFeature([Book, Author, User]),
    AuthModule, CaslModule
  ],
  providers: [BooksService, AuthorsService],
  controllers: [BooksController, AuthorsController],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'books', method: RequestMethod.GET });
    consumer
      .apply(loggerMiddleware)
      .forRoutes(BooksController, AuthorsController);
  }
}
