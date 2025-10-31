import { Inject, Injectable } from '@nestjs/common';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from 'src/models/author.model';
import * as sequelizeTypescript from 'sequelize-typescript';
import { CrudService } from 'src/generics/crud.service';

@Injectable()
export class AuthorsService extends CrudService<Author> {
  private readonly apiKey: string;
  constructor(
    @Inject(APP_KEY_TOKEN) apiKey: string,
    @InjectModel(Author) authorModel: sequelizeTypescript.ModelCtor<Author>,
  ) {
    super(authorModel);
    this.apiKey = apiKey;
    console.log('AuthorsService initialized with API Key:', this.apiKey);
  }

  async findByLastName(lastname: string): Promise<Author[]> {
    return this.model.findAll({
      where: { lastname: lastname as string },
    });
  }

  async findAuthorBooks(author_id: number): Promise<any[]> {
    const author = (await this.model.findByPk(author_id, {
      include: [{ all: true }],
      raw: false,
      nest: true,
    })) as Author;
    console.log(author);
    return author ? author.books : [];
  }
}
