import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { BookInterface } from './books.interface';
import { CreateBookDto } from 'src/models/create-book.dto';
import * as sequelize from 'sequelize';
import { Book } from 'src/models/book.model';

@Controller('books')
@UseInterceptors(LoggingInterceptor)
@UseGuards(RolesGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Roles(['admin'])
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @Roles(['user'])
  findByPk(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findByPk(id);
  }

  @Get('author/:author_id')
  @Roles(['user'])
  findByAuthor(@Param('author_id', ParseIntPipe) author_id: number) {
    return this.booksService.findByAuthor(author_id);
  }

  @Post()
  @Roles(['admin', 'user'])
  async create(@Body() bookData: sequelize.CreationAttributes<Book>) {
    return this.booksService.create(bookData);
  }
}
