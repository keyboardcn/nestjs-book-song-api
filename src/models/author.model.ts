import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Book } from './book.model';

@Table({ tableName: 'authors' })
export class Author extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;

  @Column
  declare firstname: string;

  @Column
  declare lastname: string;

  @Column({ unique: true, allowNull: false })
  declare email: string;

  @HasMany(() => Book)
  declare books: Book[];
}
