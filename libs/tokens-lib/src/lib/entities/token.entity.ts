import { UserEntity } from '@app/users-lib';
import { IToken } from '../interfaces';
import { builder } from '@app/utils';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const buildEntity = (entity: TokenEntity): TokenEntity => {
  return builder<TokenEntity>()
    .id(entity.id)
    .accessToken(entity.accessToken)
    .refreshToken(entity.refreshToken)
    .deviceId(entity.deviceId)
    .userId(entity.userId)
    .user(entity.user ? new UserEntity(entity.user) : undefined)
    .expiredAt(entity.expiredAt)
    .createdAt(entity.createdAt)
    .updatedAt(entity.updatedAt)
    .build();
};

export class TokenEntity implements IToken {
  @Exclude()
  public id: string;
  @ApiProperty()
  public accessToken: string;
  @ApiProperty()
  public refreshToken: string;
  @ApiProperty()
  public deviceId: string;
  @ApiProperty()
  public userId: string;
  @Exclude()
  public user?: UserEntity;
  @ApiProperty()
  public expiredAt: Date;
  @Exclude()
  public createdAt: Date;
  @Exclude()
  public updatedAt: Date;

  constructor(entity: TokenEntity) {
    Object.assign(this, buildEntity(entity));
  }
}
