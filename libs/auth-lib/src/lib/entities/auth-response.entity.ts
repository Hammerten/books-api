import { ProfileEntity } from '@app/users-lib';
import { TokenEntity } from '@app/tokens-lib';
import { builder } from '@app/utils';
import { ApiProperty } from '@nestjs/swagger';

const buildEntity = (entity: AuthResponseEntity): AuthResponseEntity => {
  return builder<AuthResponseEntity>()
    .userId(entity.userId)
    .credentials(new TokenEntity(entity.credentials))
    .user(new ProfileEntity(entity.user))
    .build();
};

export class AuthResponseEntity {
  @ApiProperty()
  public userId: string;
  @ApiProperty()
  public user: ProfileEntity;
  @ApiProperty()
  public credentials: TokenEntity;

  constructor(entity: AuthResponseEntity) {
    Object.assign(this, buildEntity(entity));
  }
}
