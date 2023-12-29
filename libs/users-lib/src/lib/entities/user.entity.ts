import { UserRole, UserStatus } from '@app/common';
import { IUser } from '../interfaces';
import { builder } from '@app/utils';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const buildEntity = (entity: UserEntity): UserEntity => {
  return builder<UserEntity>()
    .createdAt(entity.createdAt)
    .email(entity.email)
    .id(entity.id)
    .name(entity.name)
    .password(entity.password)
    .role(entity.role)
    .status(entity.status)
    .updatedAt(entity.updatedAt)
    .build();
};

export class UserEntity implements IUser {
  @ApiProperty()
  public id: string;
  @Exclude()
  public email: string;
  @ApiProperty()
  public name: string;
  @Exclude()
  public password: string;
  @Exclude()
  public role: UserRole;
  @Exclude()
  public status: UserStatus;
  @Exclude()
  public createdAt: Date;
  @Exclude()
  public updatedAt: Date;

  constructor(entity: UserEntity) {
    Object.assign(this, buildEntity(entity));
  }
}
