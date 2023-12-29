import { Inject, Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
  PaginatedResult,
  PaginatedService,
  PaginationInput,
} from '@app/common';
import { BookEntity } from './entities';
import { BOOKS_REPOSITORY_TOKEN, BooksRepository } from './repositories';
import { BookCreationAttrs, BookFilter, BookUpdateAttrs } from './interfaces';
import { CreateBookDto, UpdateBookDto } from './dtos';
import { builder } from '@app/utils';
import { buildBookPages, countBookPages } from './utils';

@Injectable()
export class BooksLibService extends PaginatedService<BookEntity> {
  constructor(
    @Inject(BOOKS_REPOSITORY_TOKEN)
    private readonly booksRepository: BooksRepository,
  ) {
    super();
  }

  public async findAll(
    pagination: PaginationInput,
    filters: Partial<BookFilter>,
  ): Promise<PaginatedResult<BookEntity>> {
    const { limit, offset } = this.getPaginationProps(pagination);

    const { items, totalCount } = await this.booksRepository.findAndCountAll(
      { limit, offset },
      filters,
    );

    return this.paginate({ items, totalCount }, pagination, BookEntity);
  }

  public async findById(id: string): Promise<BookEntity> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new NotFoundException({ message: 'Book not found' });
    }

    return new BookEntity(book);
  }

  public async deleteById(id: string): Promise<void> {
    await this.findById(id);
    await this.booksRepository.deleteById(id);
  }

  public async updateById(
    id: string,
    userId: string,
    input: UpdateBookDto,
  ): Promise<BookEntity> {
    const book = await this.findById(id);

    if (book.authorId !== userId) {
      throw new ForbiddenException();
    }

    const updateAttrs = builder<BookUpdateAttrs>()
      .title(input.title)
      .pages(buildBookPages(input.pages))
      .pageCount(countBookPages(input.pages))
      .build();

    await this.booksRepository.updateById(id, updateAttrs);
    return this.findById(id);
  }

  public async create(
    input: CreateBookDto,
    authorId: string,
  ): Promise<BookEntity> {
    const creationAttrs = builder<BookCreationAttrs>()
      .title(input.title)
      .authorId(authorId)
      .pages(buildBookPages(input.pages))
      .pageCount(countBookPages(input.pages))
      .build();

    const book = await this.booksRepository.create(creationAttrs);
    return new BookEntity(book);
  }
}
