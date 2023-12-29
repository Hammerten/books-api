import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtConfig } from '@app/tokens-lib';
import { UserPayload } from '@app/common';
import { AuthLibService } from '../auth-lib.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthLibService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<JwtConfig>('jwt').accessSecret,
      passReqToCallback: true,
    });
  }

  public async validate(req: Request): Promise<UserPayload> {
    const token = req.header('authorization').split(' ')[1];
    return this.authService.validateToken(token);
  }
}
