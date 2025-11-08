import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript';
import { Author } from './author.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;

  @Column
  declare firstname: string;

  @Column
  declare lastname: string;

  @Column({ unique: true, allowNull: false })
  declare email: string;

  //seperated by ',', e.g. 'admin,user,author'
  @Column
  declare roles: string;

  @Column({ allowNull: false })
  declare password: string;

  @HasOne(() => Author)
  declare author: Author;
}
