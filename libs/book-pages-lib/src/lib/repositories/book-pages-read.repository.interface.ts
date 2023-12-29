import { Repository } from '@app/common';
import { BookPageReadEntity } from '../entities';
import { BaseBookPageRead } from '../interfaces';

export interface BookPagesReadRepository
  extends Repository<BookPageReadEntity> {
  findByBookIdAndUserId(
    bookId: string,
    userId: string,
  ): Promise<BookPageReadEntity>;
  createOrUpdate(input: BaseBookPageRead): Promise<void>;
}

export const BOOK_PAGES_READ_REPOSITORY_TOKEN = Symbol(
  'book-pages-read-repository-token',
);
