import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { BookCreationAttrs, IBook } from '../interfaces';
import { User } from '@app/users-lib';
import { BookPage } from '@app/book-pages-lib';

@Table({ tableName: 'books' })
export class Book extends Model<Book, BookCreationAttrs> implements IBook {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id')?.toString();
    },
  })
  id: string;

  @Column
  title: string;

  @ForeignKey(() => User)
  @Column({
    get() {
      return this.getDataValue('authorId')?.toString();
    },
  })
  authorId: string;

  @BelongsTo(() => User)
  author?: User;

  @Column
  pageCount: number;

  @HasMany(() => BookPage)
  pages?: BookPage[];

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
