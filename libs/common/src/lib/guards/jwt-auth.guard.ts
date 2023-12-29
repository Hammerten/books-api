import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  AuthorizationStatusEnum,
  ExpiredAccessTokenException,
  UnauthorizedException,
} from '@app/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException();
    }

    const authorizationStatus: AuthorizationStatusEnum =
      user.authorizationStatus;

    if (authorizationStatus === AuthorizationStatusEnum.EXPIRED) {
      throw new ExpiredAccessTokenException();
    }

    if (authorizationStatus !== AuthorizationStatusEnum.ACTIVE) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
