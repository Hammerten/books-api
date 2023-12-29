import { Injectable } from '@nestjs/common';
import { UserEntity, UsersLibService } from '@app/users-lib';
import {
  AuthorizationStatusEnum,
  UnauthorizedException,
  UserPayload,
} from '@app/common';
import { AuthTokenSecret, TokensLibService } from '@app/tokens-lib';
import { PasswordService } from '@app/utils';
import { LoginDto, RegisterDto } from './dtos';
import { AuthResponseEntity } from './entities';

@Injectable()
export class AuthLibService {
  constructor(
    private readonly usersService: UsersLibService,
    private readonly tokensService: TokensLibService,
    private readonly passwordService: PasswordService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isMatch = await this.passwordService.compare(password, user.password);

    if (!isMatch) return null;

    delete user.password;
    return user;
  }

  public async validateToken(token: string): Promise<UserPayload | never> {
    return this.tokensService.verifyToken(token, AuthTokenSecret.ACCESS_SECRET);
  }

  public async login(input: LoginDto): Promise<AuthResponseEntity> {
    const user = await this.validateUser(input.email, input.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.logout(user.id, input.deviceId);

    return this.performLogin(user, input.deviceId);
  }

  private async isRegistered(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);

    return Boolean(user);
  }

  private async performLogin(
    user: UserEntity,
    deviceId: string,
  ): Promise<AuthResponseEntity> {
    const token = await this.tokensService.generateTokens(user, deviceId);

    return new AuthResponseEntity({
      user,
      userId: user.id,
      credentials: token,
    });
  }

  public async refreshToken(refreshToken: string): Promise<AuthResponseEntity> {
    const {
      payload: { sub, deviceId },
      authorizationStatus,
    } = await this.tokensService.verifyToken(
      refreshToken,
      AuthTokenSecret.REFRESH_SECRET,
    );

    if (authorizationStatus === AuthorizationStatusEnum.EXPIRED) {
      throw new UnauthorizedException();
    }

    const session = await this.tokensService.findByRefreshToken(
      sub,
      refreshToken,
    );

    if (!session || !session.user) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.tokensService.generateAccessToken({
      sub: session.userId,
      deviceId,
    });

    await this.tokensService.update(session.id, {
      accessToken,
    });

    const token = await this.tokensService.findById(session.id);

    return new AuthResponseEntity({
      user: session.user,
      userId: session.user.id,
      credentials: token,
    });
  }

  public async logout(userId: string, deviceId: string): Promise<void> {
    if (!deviceId) {
      return;
    }

    const session = await this.tokensService.findByDeviceIdAndUserId(
      deviceId,
      userId,
    );

    if (!session) {
      return;
    }
    await this.tokensService.deleteById(session.id);
  }

  public async register(input: RegisterDto): Promise<void> {
    await this.usersService.create(input);
  }
}
