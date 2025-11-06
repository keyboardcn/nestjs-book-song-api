import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import * as sequelize from 'sequelize';
import { Book } from 'src/models/book.model';
import { CacheInterceptor } from '@nestjs/cache-manager';
import express from 'express';
import { AuthGuardService } from 'src/auth/authguard.service';
@Controller('books')
@UseInterceptors(LoggingInterceptor, CacheInterceptor)
@UseGuards(RolesGuard)
export class BooksController {
  private readonly logger = new Logger(BooksController.name);
  constructor(private readonly booksService: BooksService) {}

  /**
   *
   * @param request
   * @returns Book[]
   *
   * @usage: headers.Cookie: "sessionId=1; anotherCookie=abc"
   */
  @Get()
  @UseGuards(AuthGuardService)
  @Roles(['admin'])
  findAll(@Req() request: express.Request) {
    // no more cookie here
    this.logger.log(`Req cookie: ${JSON.stringify(request.cookies)}`);
    // expect signed cookie
    this.logger.log(`${JSON.stringify(request.signedCookies)}`);
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
