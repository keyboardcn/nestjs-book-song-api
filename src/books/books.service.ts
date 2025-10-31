import { Inject, Injectable } from '@nestjs/common';
import { APP_KEY_TOKEN } from 'src/providers/app.constant';

@Injectable()
export class BooksService {
  private readonly apiKey: string;
  constructor(@Inject(APP_KEY_TOKEN) apiKey: string) {
    this.apiKey = apiKey;
    console.log('BooksService initialized with API Key:', this.apiKey);
  }
  private books = [
    { id: 1, title: '1984', author: 'George Orwell', publishedYear: 1949 },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedYear: 1960,
    },
  ];

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    console.log('Finding book with id:', id);
    return this.books.find((book) => book.id === id);
  }
}
