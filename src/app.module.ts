import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BooksModule } from './books/books.module';
import { CoreConfigModule } from './core-config.module';
import { Book } from './models/book.model';
import { Author } from './models/author.model';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './schedules/tasks.module';
import { BullModule } from '@nestjs/bullmq';
import { AudiosModule } from './queues/audios.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FileController } from './streaming/file.controller';
import { DogsModule } from './dogs/dogs.moudle';
import { UsersModule } from './users/users.module';
import { User } from './models/user.model';
import { CaslModule } from './casl/caslAbility.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'book_song_db',
      autoLoadModels: true,
      synchronize: true,
      models: [Book, Author, User],
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    AuthModule,
    CaslModule,
    UsersModule,
    BooksModule,
    CoreConfigModule,
    CacheModule.register({
      ttl: 5000,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    AudiosModule,
    DogsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  controllers: [FileController],
})
export class AppModule {}
