import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksModule } from './books/books.module';
import { CoreConfigModule } from './core-config.module';
import { Book } from './models/book.model';
import { Author } from './models/author.model';

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
      models: [Book, Author],
    }),
    BooksModule,
    CoreConfigModule,
  ],
  controllers: [],
})
export class AppModule {}
