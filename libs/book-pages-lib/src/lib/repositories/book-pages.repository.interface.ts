import { PaginationProps, QueryResult, Repository } from '@app/common';
import { BookPageEntity } from '../entities';
import { BookPageFilter } from '../interfaces';

export interface BookPagesRepository extends Repository<BookPageEntity> {
  findAndCountAll(
    pagination: PaginationProps,
    filters: Partial<BookPageFilter>,
  ): Promise<QueryResult<BookPageEntity>>;
  findByBookIdAndPageNo(
    bookId: string,
    pageNo: number,
  ): Promise<BookPageEntity>;
}

export const BOOK_PAGES_REPOSITORY_TOKEN = Symbol(
  'book-pages-repository-token',
);
