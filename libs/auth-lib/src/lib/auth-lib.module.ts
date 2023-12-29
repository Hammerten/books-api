import { AuthLibService } from './auth-lib.service';
import { Module } from '@nestjs/common';
import { TokensLibModule } from '@app/tokens-lib';
import { UsersLibModule } from '@app/users-lib';
import { UtilsModule } from '@app/utils';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';

@Module({
  imports: [UsersLibModule, TokensLibModule, UtilsModule, PassportModule],
  providers: [AuthLibService, JwtStrategy],
  exports: [AuthLibService],
})
export class AuthLibModule {}
