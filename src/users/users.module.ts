import {
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  Module,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { loggerMiddleware } from 'src/middleware/logger.middleware';
import { User } from 'src/models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Author } from 'src/models/author.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Author])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
    consumer.apply(loggerMiddleware).forRoutes(UsersController);
  }
}
