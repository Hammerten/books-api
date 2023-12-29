import { Op, Sequelize, Transaction, WhereOptions } from 'sequelize';
import { Book } from '../../models';
import {
  BookCreationAttrs,
  BookFilter,
  BookUpdateAttrs,
} from '../../interfaces';
import { BooksRepository } from '../books.repository.interface';
import {
  InternalServerException,
  NotFoundException,
  PaginationProps,
  QueryResult,
} from '@app/common';
import { Repository } from 'sequelize-typescript';
import { User } from '@app/users-lib';
import { BookPage } from '@app/book-pages-lib';

export class BooksSequelizeRepository implements BooksRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly booksRepository: Repository<Book>,
  ) {}

  public findById(id: string, transaction?: Transaction): Promise<Book> {
    return this.booksRepository.findByPk(id, {
      include: [User],
      ...(transaction && { transaction }),
    });
  }

  public async findAndCountAll(
    { limit, offset }: PaginationProps,
    filters: Partial<BookFilter>,
  ): Promise<QueryResult<Book>> {
    const { title, ...props } = filters;

    const where: WhereOptions<Book> = {
      ...props,
    };

    if (title) {
      where.title = {
        [Op.iLike]: `%${title}%`,
      };
    }

    const { rows: items, count: totalCount } =
      await this.booksRepository.findAndCountAll({
        where,
        offset,
        limit,
        include: [User],
        order: [['createdAt', 'DESC']],
      });

    return { items, totalCount };
  }

  public findAll(
    pagination?: PaginationProps,
    filters?: Partial<BookFilter>,
  ): Promise<Book[]> {
    const { title, ...props } = filters;

    const where: WhereOptions<Book> = {
      ...props,
    };

    if (title) {
      where.title = {
        [Op.iLike]: `%${title}%`,
      };
    }

    return this.booksRepository.findAll({
      where,
      include: [User],
      ...pagination,
    });
  }

  public findByIds(ids: string[]): Promise<Book[]> {
    return this.booksRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  private async updatePages(
    book: Book,
    pages: BookUpdateAttrs['pages'],
    transaction: Transaction,
  ) {
    if (pages.length > 0) {
      await BookPage.destroy({
        where: {
          bookId: book.id,
        },
        transaction,
      });
      await BookPage.bulkCreate(
        pages.map((input) => {
          return { ...input, bookId: book.id };
        }),
        {
          transaction,
        },
      );
    }
  }

  public async updateById(
    id: string,
    input: Partial<BookUpdateAttrs>,
  ): Promise<[affectedCount: number]> {
    const transaction = await this.sequelize.transaction();
    try {
      const { pages, ...bookInput } = input;
      const update = await this.booksRepository.update(bookInput, {
        where: {
          id,
        },
        transaction,
      });

      const book = await this.findById(id, transaction);
      if (!book) {
        throw new NotFoundException();
      }

      await this.updatePages(book, pages, transaction);

      await transaction.commit();
      return update;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      await transaction.rollback();

      throw new InternalServerException({
        message: 'Error during book update',
      });
    }
  }

  public deleteById(id: string): Promise<number> {
    return this.booksRepository.destroy({
      where: {
        id,
      },
    });
  }

  public async create(input: BookCreationAttrs): Promise<Book> {
    const book = await this.booksRepository.create(input, {
      include: [BookPage, User],
    });

    return this.findById(book.id);
  }
}
