import { Repository } from '@app/common';
import { BaseToken } from '../interfaces';
import { TokenEntity } from '../entities';

export type TokensRepository = Repository<TokenEntity> & {
  create(input: BaseToken): Promise<TokenEntity>;
  findByDeviceIdAndUserId(
    deviceId: string,
    userId: string,
  ): Promise<TokenEntity>;
  findByRefreshToken(userId: string, token: string): Promise<TokenEntity>;
};

export const TOKENS_REPOSITORY_TOKEN = Symbol('tokens-repository-token');
