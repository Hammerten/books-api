import { Op } from 'sequelize';
import { Repository } from 'sequelize-typescript';
import { PaginationProps, QueryResult } from '@app/common';
import { User } from '../../models';
import { UsersRepository } from '../users.repository.interface';
import { BaseUser, UserFilter } from '../../interfaces';

export class UsersSequelizeRepository implements UsersRepository {
  constructor(private readonly usersRepository: Repository<User>) {}

  public findById(id: string): Promise<User> {
    return this.usersRepository.findByPk(id);
  }

  public findAll(
    { offset, limit }: PaginationProps,
    filters: Partial<UserFilter>,
  ): Promise<User[]> {
    return this.usersRepository.findAll({
      where: {
        ...filters,
      },
      offset,
      limit,
    });
  }

  public async findAndCountAll(
    { offset, limit }: PaginationProps,
    filters: Partial<UserFilter>,
  ): Promise<QueryResult<User>> {
    const { rows: items, count: totalCount } =
      await this.usersRepository.findAndCountAll({
        where: {
          ...filters,
          ...Object.entries(filters).map(([k, v]) => ({
            [k]: {
              [Op.contains]: v,
            },
          })),
        },
        offset,
        limit,
      });
    return { items, totalCount };
  }

  public async updateById(
    id: string,
    user: Partial<BaseUser>,
  ): Promise<[affectedCount: number]> {
    return this.usersRepository.update(
      { ...user },
      {
        where: {
          id,
        },
      },
    );
  }

  public deleteById(id: string): Promise<number> {
    return this.usersRepository.destroy({
      where: {
        id,
      },
    });
  }

  public findByIds(ids: string[]): Promise<User[]> {
    return this.usersRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  public findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  public create(input: BaseUser): Promise<User> {
    return this.usersRepository.create(input);
  }
}
