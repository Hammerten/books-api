import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { IBookPage } from '../interfaces';
import { Book } from '@app/books-lib';

@Table({ tableName: 'book_pages' })
export class BookPage extends Model<BookPage> implements IBookPage {
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

  @BelongsTo(() => Book)
  book?: Book;

  @Column
  pageNo: number;

  @Column({
    type: DataType.JSONB,
  })
  data: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
