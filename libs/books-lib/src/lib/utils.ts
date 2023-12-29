import { BaseBookPage } from '@app/book-pages-lib';
import { CreateBookPageDto } from './dtos';

export const buildBookPages = (
  pages: CreateBookPageDto[],
): Omit<BaseBookPage, 'bookId'>[] => {
  return pages.map((page, idx) => {
    return { pageNo: idx + 1, data: page.data };
  });
};

export const countBookPages = (pages: CreateBookPageDto[]): number => {
  return pages.length;
};
