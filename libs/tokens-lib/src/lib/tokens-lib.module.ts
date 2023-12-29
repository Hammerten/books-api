import { Module } from '@nestjs/common';
import { TokensLibService } from './tokens-lib.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfig } from './configs';
import { Token } from './models';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './interfaces';
import { provideTokensRepository } from './repositories/implementations/tokens.repository.provider';
import { DataSource } from '@app/common';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    SequelizeModule.forFeature([Token]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const { expiresIn, accessSecret, issuer } =
          configService.get<JwtConfig>('jwt');
        return {
          secret: accessSecret,
          signOptions: {
            expiresIn,
            issuer,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    TokensLibService,
    ...provideTokensRepository(DataSource.SEQUELIZE),
  ],
  exports: [TokensLibService],
})
export class TokensLibModule {}
