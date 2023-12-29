import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@app/users-lib';
import {
  AuthorizationStatusEnum,
  UnauthorizedException,
  UserPayload,
} from '@app/common';
import { TOKENS_REPOSITORY_TOKEN, TokensRepository } from './repositories';
import { BaseToken, JwtConfig, jwtPayload } from './interfaces';
import { TokenEntity } from './entities';
import { AuthTokenSecret } from './enums';

@Injectable()
export class TokensLibService {
  constructor(
    @Inject(TOKENS_REPOSITORY_TOKEN) private tokensRepository: TokensRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public findById(id: string): Promise<TokenEntity> {
    return this.tokensRepository.findById(id);
  }

  public create(input: BaseToken): Promise<TokenEntity> {
    if (!input.accessToken || !input.refreshToken) {
      return null;
    }

    return this.tokensRepository.create(input);
  }

  public update(
    id: string,
    token: Partial<BaseToken>,
  ): Promise<[affectedCount: number]> {
    return this.tokensRepository.updateById(id, token);
  }

  public generateTokens(
    user: UserEntity,
    deviceId: string,
  ): Promise<TokenEntity> {
    const payload = {
      sub: user.id,
      deviceId,
    };

    const newDate = new Date();

    const expiredAt = new Date(
      newDate.setDate(
        newDate.getDate() +
          this.configService.get<JwtConfig>('jwt').refreshInDays,
      ),
    );

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return this.create({
      accessToken,
      refreshToken,
      deviceId,
      userId: user.id,
      expiredAt,
    });
  }

  public async verifyToken(
    token: string,
    type: AuthTokenSecret = AuthTokenSecret.ACCESS_SECRET,
  ): Promise<UserPayload | never> {
    const secret = this.configService.get<JwtConfig>('jwt')[type];

    const { deviceId, sub, exp } = this.jwtService.verify<
      jwtPayload & { exp: number }
    >(token, {
      secret,
      ignoreExpiration: true,
    });

    const session = await this.findByDeviceIdAndUserId(deviceId, sub);
    if (!session || !session.user) throw new UnauthorizedException();
    const isExpired = Number(new Date()) > exp * 1000;
    const authorizationStatus = isExpired
      ? AuthorizationStatusEnum.EXPIRED
      : AuthorizationStatusEnum.ACTIVE;
    return {
      data: session.user,
      payload: { deviceId, sub },
      authorizationStatus,
    };
  }

  public generateAccessToken(payload: jwtPayload): string {
    return this.jwtService.sign({ ...payload, type: 'access' });
  }

  public generateRefreshToken(payload: jwtPayload): string {
    const { refreshIn, refreshSecret } =
      this.configService.get<JwtConfig>('jwt');
    const options: JwtSignOptions = {
      secret: refreshSecret,
      expiresIn: refreshIn,
    };

    return this.jwtService.sign({ ...payload, type: 'refresh' }, options);
  }

  public findByDeviceIdAndUserId(
    deviceId: string,
    userId: string,
  ): Promise<TokenEntity> {
    return this.tokensRepository.findByDeviceIdAndUserId(deviceId, userId);
  }

  public findByRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<TokenEntity> {
    return this.tokensRepository.findByRefreshToken(userId, refreshToken);
  }

  public deleteById(id: string) {
    return this.tokensRepository.deleteById(id);
  }
}
