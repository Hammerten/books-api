import { Attributes, Op } from 'sequelize';
import { Token } from '../../models';
import { TokensRepository } from '../tokens.repository.interface';
import { Repository } from 'sequelize-typescript';
import { User } from '@app/users-lib';
import { BaseToken } from '../../interfaces';

export class TokensSequelizeRepository implements TokensRepository {
  constructor(private readonly tokensRepository: Repository<Token>) {}

  public findByDeviceIdAndUserId(
    deviceId: string,
    userId: string,
  ): Promise<Token> {
    return this.tokensRepository.findOne({
      where: {
        deviceId,
        userId,
      },
      include: User,
    });
  }

  public findById(id: string): Promise<Token> {
    return this.tokensRepository.findByPk(id);
  }

  public findAll(): Promise<Token[]> {
    return this.tokensRepository.findAll();
  }

  public findByIds(ids: string[]): Promise<Token[]> {
    return this.tokensRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  public deleteById(id: string): Promise<number> {
    return this.tokensRepository.destroy({
      where: {
        id,
      },
    });
  }

  public updateById(
    id: string,
    token: Attributes<Token>,
  ): Promise<[affectedCount: number]> {
    return this.tokensRepository.update(token, {
      where: {
        id,
      },
    });
  }

  public create(token: BaseToken): Promise<Token> {
    return this.tokensRepository.create(token);
  }

  public findByRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Token> {
    return this.tokensRepository.findOne({
      where: {
        userId,
        refreshToken,
      },
      include: User,
    });
  }
}
