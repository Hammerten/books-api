import { Attributes, Op, WhereOptions } from 'sequelize';
import { PaginationProps, QueryResult } from '@app/common';
import { Repository } from 'sequelize-typescript';
import { BookPagesRepository } from '../book-pages.repository.interface';
import { BookPage } from '../../models';
import { BookPageFilter } from '../../interfaces';

export class BookPagesSequelizeRepository implements BookPagesRepository {
  constructor(private readonly bookPagesRepository: Repository<BookPage>) {}

  public findById(id: string): Promise<BookPage> {
    return this.bookPagesRepository.findByPk(id);
  }

  public async findAndCountAll(
    { limit, offset }: PaginationProps,
    filters: Partial<BookPageFilter>,
  ): Promise<QueryResult<BookPage>> {
    const { ...props } = filters;

    const where: WhereOptions<BookPage> = {
      ...props,
    };

    const { rows: items, count: totalCount } =
      await this.bookPagesRepository.findAndCountAll({
        where,
        offset,
        limit,
        order: [['pageNo', 'DESC']],
      });

    return { items, totalCount };
  }

  public findAll(
    pagination?: PaginationProps,
    filters?: Partial<BookPageFilter>,
  ): Promise<BookPage[]> {
    const { ...props } = filters;

    const where: WhereOptions<BookPage> = {
      ...props,
    };

    return this.bookPagesRepository.findAll({
      where,
      ...pagination,
    });
  }

  public findByIds(ids: string[]): Promise<BookPage[]> {
    return this.bookPagesRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  public updateById(
    id: string,
    dto: Attributes<BookPage>,
  ): Promise<[affectedCount: number]> {
    return this.bookPagesRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  public deleteById(id: string): Promise<number> {
    return this.bookPagesRepository.destroy({
      where: {
        id,
      },
    });
  }

  public findByBookIdAndPageNo(
    bookId: string,
    pageNo: number,
  ): Promise<BookPage> {
    return this.bookPagesRepository.findOne({
      where: {
        bookId,
        pageNo,
      },
    });
  }
}
