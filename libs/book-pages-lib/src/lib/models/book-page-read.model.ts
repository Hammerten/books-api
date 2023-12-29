import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Book } from '@app/books-lib';
import { User } from '@app/users-lib';
import { BookPage } from './book-page.model';
import { IBookPageRead } from '../interfaces';

@Table({ tableName: 'book_pages_read' })
export class BookPageRead extends Model<BookPageRead> implements IBookPageRead {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id')?.toString();
    },
  })
  id: string;

  @ForeignKey(() => Book)
  @Column({
    get() {
      return this.getDataValue('bookId')?.toString();
    },
  })
  bookId: string;

  @ForeignKey(() => User)
  @Column({
    get() {
      return this.getDataValue('userId')?.toString();
    },
  })
  userId: string;

  @ForeignKey(() => BookPage)
  @Column({
    get() {
      return this.getDataValue('pageId')?.toString();
    },
  })
  pageId: string;

  @BelongsTo(() => Book)
  book?: Book;

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => BookPage)
  page?: BookPage;

  @Column
  pageNo: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
