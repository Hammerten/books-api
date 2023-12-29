import { Inject, Injectable } from '@nestjs/common';
import {
  ConflictException,
  InternalServerException,
  NotFoundException,
  PGErrorCode,
  PaginatedResult,
  PaginatedService,
  PaginationInput,
  UserRole,
  UserStatus,
} from '@app/common';
import { PasswordService } from '@app/utils';
import { USERS_REPOSITORY_TOKEN, UsersRepository } from './repositories';
import { BaseUser, UserFilter } from './interfaces';
import { UserEntity } from './entities';
import { RegisterDto } from '@app/auth-lib';

@Injectable()
export class UsersLibService extends PaginatedService<UserEntity> {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN) private usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {
    super();
  }

  public async create(input: RegisterDto) {
    try {
      const hashedPassword = await this.passwordService.hash(input.password);
      const user = await this.usersRepository.create({
        ...input,
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        password: hashedPassword,
      });

      return this.findById(user.id);
    } catch (error) {
      switch (error?.parent?.code) {
        case PGErrorCode.UNIQUE_VIOLATION:
          throw new ConflictException({
            message: `Cannot create new user. User with email:${input.email} already exists`,
          });
        default:
          throw new InternalServerException({
            message: `${error?.parent?.detail}`,
          });
      }
    }
  }

  public async findAll(
    pagination: PaginationInput,
    filters: Partial<UserFilter>,
  ): Promise<PaginatedResult<UserEntity>> {
    const { limit, offset } = this.getPaginationProps(pagination);

    const { items, totalCount } = await this.usersRepository.findAndCountAll(
      { limit, offset },
      filters,
    );

    return this.paginate({ items, totalCount }, pagination, UserEntity);
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    return user;
  }

  public async updateById(
    id: string,
    user: Partial<BaseUser>,
  ): Promise<[affectedCount: number]> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }
    return this.usersRepository.updateById(id, user);
  }

  public async deleteById(id: string): Promise<number> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    return this.usersRepository.deleteById(id);
  }

  public findByEmail(email: string): Promise<UserEntity | never> {
    return this.usersRepository.findByEmail(email);
  }

  public findByIds(ids: string[]): Promise<UserEntity[]> {
    return this.usersRepository.findByIds(ids);
  }

  public async updateUserPassword(id: string, password: string): Promise<void> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.updateById(id, {
      password,
    });
  }
}
