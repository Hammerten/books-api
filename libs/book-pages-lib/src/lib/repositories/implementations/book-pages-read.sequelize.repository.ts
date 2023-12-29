import { Attributes, Op, WhereOptions } from 'sequelize';
import { PaginationProps } from '@app/common';
import { Repository } from 'sequelize-typescript';
import { BookPageRead } from '../../models';
import { BookPagesReadRepository } from '../book-pages-read.repository.interface';
import { BaseBookPageRead } from '../../interfaces';

export class BookPagesReadSequelizeRepository
  implements BookPagesReadRepository
{
  constructor(
    private readonly bookPagesReadRepository: Repository<BookPageRead>,
  ) {}

  public findById(id: string): Promise<BookPageRead> {
    return this.bookPagesReadRepository.findByPk(id);
  }

  public findAll(
    pagination?: PaginationProps,
    filters?: Partial<Attributes<BookPageRead>>,
  ): Promise<BookPageRead[]> {
    const { ...props } = filters;

    const where: WhereOptions<BookPageRead> = {
      ...props,
    };

    return this.bookPagesReadRepository.findAll({
      where,
      ...pagination,
    });
  }

  public findByIds(ids: string[]): Promise<BookPageRead[]> {
    return this.bookPagesReadRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  public updateById(
    id: string,
    dto: Attributes<BookPageRead>,
  ): Promise<[affectedCount: number]> {
    return this.bookPagesReadRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  public deleteById(id: string): Promise<number> {
    return this.bookPagesReadRepository.destroy({
      where: {
        id,
      },
    });
  }

  public findByBookIdAndUserId(
    bookId: string,
    userId: string,
  ): Promise<BookPageRead> {
    return this.bookPagesReadRepository.findOne({
      where: {
        bookId,
        userId,
      },
    });
  }

  public async createOrUpdate(input: BaseBookPageRead): Promise<void> {
    await this.bookPagesReadRepository.destroy({
      where: {
        bookId: input.bookId,
        userId: input.userId,
      },
    });
    await this.bookPagesReadRepository.upsert(input);
  }
}
