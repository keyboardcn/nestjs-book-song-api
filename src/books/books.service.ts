import { Inject, Injectable } from '@nestjs/common';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from 'src/models/book.model';
import * as sequelizeTypescript from 'sequelize-typescript';
import { CrudService } from 'src/generics/crud.service';
import { CreateBookDto } from 'src/models/create-book.dto';

@Injectable()
export class BooksService extends CrudService<Book> {
  private readonly apiKey: string;
  private readonly bookModel: sequelizeTypescript.ModelCtor<Book>;
  constructor(
    @Inject(APP_KEY_TOKEN) apiKey: string,
    @InjectModel(Book) bookModel: sequelizeTypescript.ModelCtor<Book>,
  ) {
    super(bookModel);
    this.apiKey = apiKey;
    console.log('BooksService initialized with API Key:', this.apiKey);
    this.bookModel = bookModel;
  }

  async findByAuthor(author_id: number): Promise<Book[]> {
    return this.bookModel.findAll({
      where: { author_id: author_id as any },
    });
  }
}
