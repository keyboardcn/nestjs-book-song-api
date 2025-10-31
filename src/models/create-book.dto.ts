import { PickType } from '@nestjs/mapped-types';
import { Book } from './book.model';

export class CreateBookDto extends PickType(Book, [
  'title',
  'author_id',
  'publishedYear',
] as const) {}
