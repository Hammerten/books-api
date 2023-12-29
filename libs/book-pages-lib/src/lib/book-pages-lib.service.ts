import { Inject, Injectable } from '@nestjs/common';
import {
  NotFoundException,
  PaginatedResult,
  PaginatedService,
  PaginationInput,
} from '@app/common';
import { BookPageEntity } from './entities';
import {
  BOOK_PAGES_READ_REPOSITORY_TOKEN,
  BOOK_PAGES_REPOSITORY_TOKEN,
  BookPagesReadRepository,
  BookPagesRepository,
} from './repositories';
import { BookPageFilter } from './interfaces';

@Injectable()
export class BookPagesLibService extends PaginatedService<BookPageEntity> {
  constructor(
    @Inject(BOOK_PAGES_REPOSITORY_TOKEN)
    private readonly bookPagesRepository: BookPagesRepository,
    @Inject(BOOK_PAGES_READ_REPOSITORY_TOKEN)
    private readonly bookPagesReadRepository: BookPagesReadRepository,
  ) {
    super();
  }

  public async findAll(
    pagination: PaginationInput,
    filters: Partial<BookPageFilter>,
  ): Promise<PaginatedResult<BookPageEntity>> {
    const { limit, offset } = this.getPaginationProps(pagination);

    const { items, totalCount } =
      await this.bookPagesRepository.findAndCountAll(
        { limit, offset },
        filters,
      );

    return this.paginate({ items, totalCount }, pagination, BookPageEntity);
  }

  public async findById(id: string): Promise<BookPageEntity> {
    const bookPage = await this.bookPagesRepository.findById(id);

    if (!bookPage) {
      throw new NotFoundException({ message: 'Book page not found' });
    }

    return new BookPageEntity(bookPage);
  }

  public async getAndReadPageByBookIdAndPageNo(
    bookId: string,
    pageNo: number,
    userId: string,
  ): Promise<BookPageEntity> {
    const book = await this.findByBookIdAndPageNo(bookId, pageNo);

    await this.bookPagesReadRepository.createOrUpdate({
      bookId,
      pageId: book.id,
      pageNo,
      userId,
    });

    return book;
  }

  public async findByBookIdAndPageNo(
    bookId: string,
    pageNo: number,
  ): Promise<BookPageEntity> {
    const bookPage = await this.bookPagesRepository.findByBookIdAndPageNo(
      bookId,
      pageNo,
    );

    if (!bookPage) {
      throw new NotFoundException({ message: 'Book page not found' });
    }

    return new BookPageEntity(bookPage);
  }

  public async getLastReadByBookIdAndUserId(
    bookId: string,
    userId: string,
  ): Promise<BookPageEntity> {
    const lastRead = await this.bookPagesReadRepository.findByBookIdAndUserId(
      bookId,
      userId,
    );

    if (!lastRead) {
      return this.findByBookIdAndPageNo(bookId, 1);
    }

    return this.findById(lastRead.pageId);
  }
}
