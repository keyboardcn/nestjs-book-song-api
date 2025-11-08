import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthorInterface } from './author.interface';
import * as sequelize from 'sequelize';
import { Author } from 'src/models/author.model';

/** versioning control using headers:
 * must have header 'Custom-Header: v1' to access v1 routes
 */
@Controller({ path: 'authors', version: 'v1' })
@UseInterceptors(LoggingInterceptor, CacheInterceptor)
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
  async findByPk(@Param('id', ParseIntPipe) id: number) {
    const rst = await this.authorsService.findByPk(id);
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

  @Patch(':id')
  @Roles(['admin'])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<AuthorInterface>,
  ) {
    return this.authorsService.update(id, updateData);
  }
}
