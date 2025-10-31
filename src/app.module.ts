import { Module } from '@nestjs/common';

import { BooksModule } from './books/books.module';
import { CoreConfigModule } from './core-config.module';

@Module({
  imports: [BooksModule, CoreConfigModule],
  controllers: [],
})
export class AppModule {}
