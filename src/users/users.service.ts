import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrudService } from 'src/generics/crud.service';
import { User } from 'src/models/user.model';
import type { ModelCtor } from 'sequelize-typescript';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';

@Injectable()
export class UsersService extends CrudService<User> {
  private readonly apiKey: string;
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(APP_KEY_TOKEN) apiKey: string,
    @InjectModel(User) userModel: ModelCtor<User>,
  ) {
    super(userModel);
    this.apiKey = apiKey;
    this.logger.log('Initialized with API Key:', this.apiKey);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({
      where: { email: email as string },
    });
  }
}
