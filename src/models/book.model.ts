import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Author } from './author.model';

@Table({ tableName: 'books' })
export class Book extends Model<Book> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;

  @Column
  declare title: string;

  @Column
  declare publishedYear: number;

  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER })
  declare author_id: number;

  @BelongsTo(() => Author)
  declare author: Author;
}
