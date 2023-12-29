import { PaginationProps, QueryResult, Repository } from '@app/common';
import { UserEntity } from '../entities';
import { BaseUser, UserFilter } from '../interfaces';

export interface UsersRepository extends Repository<UserEntity> {
  create(input: BaseUser): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findAndCountAll(
    pagination: PaginationProps,
    filters: Partial<UserFilter>,
  ): Promise<QueryResult<UserEntity>>;
}

export const USERS_REPOSITORY_TOKEN = Symbol('users-repository-token');
