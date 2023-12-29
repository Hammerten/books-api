import { IUser } from '@app/users-lib';
import { BaseBookPage, IBookPage } from '@app/book-pages-lib';

export interface IBook {
  id: string;
  title: string;
  authorId: string;
  author?: IUser;
  pageCount: number;
  pages?: IBookPage[];
  createdAt: Date;
  updatedAt: Date;
}

export type BaseBook = Omit<
  IBook,
  'id' | 'createdAt' | 'updatedAt' | 'author' | 'pages'
>;

export type BookCreationAttrs = BaseBook & {
  pages: Omit<BaseBookPage, 'bookId'>[];
};

export type BookUpdateAttrs = Omit<BookCreationAttrs, 'authorId'>;
