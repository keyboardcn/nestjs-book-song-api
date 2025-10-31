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
import { AuthorsService } from './authors.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AuthorInterface } from './author.interface';
import * as sequelize from 'sequelize';
import { Author } from 'src/models/author.model';
@Controller('authors')
@UseInterceptors(LoggingInterceptor)
@UseGuards(RolesGuard)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @Roles(['admin'])
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @Roles(['user'])
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findByPk(id);
  }

  @Get(':id/books')
  @Roles(['user'])
  findAuthorBooks(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findAuthorBooks(id);
  }

  @Post()
  @Roles(['admin', 'user'])
  async create(@Body() authorData: sequelize.CreationAttributes<Author>) {
    return this.authorsService.create(authorData);
  }
}
