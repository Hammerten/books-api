import { PaginationProps, QueryResult, Repository } from '@app/common';
import { BookEntity } from '../entities';
import { BookCreationAttrs, BookFilter, BookUpdateAttrs } from '../interfaces';

export interface BooksRepository
  extends Omit<Repository<BookEntity>, 'updateById'> {
  findAndCountAll(
    pagination: PaginationProps,
    filters: Partial<BookFilter>,
  ): Promise<QueryResult<BookEntity>>;
  create(input: BookCreationAttrs): Promise<BookEntity>;
  updateById(
    id: string,
    input: BookUpdateAttrs,
  ): Promise<[affectedCount: number]>;
}

export const BOOKS_REPOSITORY_TOKEN = Symbol('books-repository-token');
