import { CacheInterceptor } from '@nestjs/cache-manager';
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
} from '@nestjs/common';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { UsersService } from './users.service';
import type { CreationAttributes } from 'sequelize';
import { User } from 'src/models/user.model';
import { UserEntity, UserInterface } from './users.interface';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';

@Controller({ path: 'users' })
@UseInterceptors(LoggingInterceptor, CacheInterceptor)
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @Roles(['user'])
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const rst = await this.usersService.findByPk(id);
    if (!rst) {
      return null;
    }
    const plainRst = rst.get({ plain: true });
    return new UserEntity(plainRst as unknown as UserEntity);
  }

  @Get('email/:email')
  @Roles(['user'])
  findByLastName(@Param('email') email: string) {
    return this.usersService.findByEmail(email.toLowerCase());
  }

  @Post()
  async create(@Body() userData: CreationAttributes<User>) {
    return this.usersService.create(userData);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<UserInterface>,
  ) {
    return this.usersService.update(id, updateData);
  }

  capitalize1stLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
