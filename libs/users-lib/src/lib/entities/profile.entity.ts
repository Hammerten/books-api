import { UserRole, UserStatus } from '@app/common';
import { IUser } from '../interfaces';
import { builder } from '@app/utils';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const buildEntity = (entity: ProfileEntity): ProfileEntity => {
  return builder<ProfileEntity>()
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

export class ProfileEntity implements IUser {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public name: string;
  @Exclude()
  public password: string;
  @ApiProperty({ enum: UserRole })
  public role: UserRole;
  @ApiProperty({ enum: UserStatus })
  public status: UserStatus;
  @Exclude()
  public createdAt: Date;
  @Exclude()
  public updatedAt: Date;

  constructor(entity: ProfileEntity) {
    Object.assign(this, buildEntity(entity));
  }
}
