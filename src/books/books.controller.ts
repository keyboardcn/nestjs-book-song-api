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
  Patch,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import * as sequelize from 'sequelize';
import { Book } from 'src/models/book.model';
import { CacheInterceptor } from '@nestjs/cache-manager';
import express from 'express';
import { CheckPolicies } from 'src/casl/policy.decorator';
import { AppAbility } from 'src/casl/caslAbilityFactory.service';
import { Action } from 'src/casl/actions.enum';
import { PolicyGuardService } from 'src/casl/policiesGuard.service';
@Controller('books')
@UseInterceptors(LoggingInterceptor, CacheInterceptor)
@UseGuards(RolesGuard, PolicyGuardService)
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
  @Roles(['admin'])
  @CheckPolicies((ablity: AppAbility) => ablity.can(Action.READ, Book))
  findAll(@Req() request: express.Request) {
    //request.session.visits =  request.session?.visits ? request.session.visits + 1: 1;
    // no more cookie here
    this.logger.log(`Req session: ${JSON.stringify(request.session)}`);
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

  @Patch(':id')
  @CheckPolicies((ablity: AppAbility) => ablity.can(Action.PATCH, Book))
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Book>,
  ) {
    return this.booksService.patch(id, updateData);
  }
  
}
