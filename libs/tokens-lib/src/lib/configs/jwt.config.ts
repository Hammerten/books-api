import { JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION } from '@app/common';
import { JwtConfig } from '../interfaces';

export const jwtConfig = (): { jwt: JwtConfig } => {
  return {
    jwt: {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION || JWT_ACCESS_EXPIRATION,
      refreshIn: process.env.JWT_REFRESH_EXPIRATION || JWT_REFRESH_EXPIRATION,
      refreshInDays: 7,
      accessSecret: process.env.JWT_ACCESS_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      issuer: process.env.SERVICE_NAME,
    },
  };
};
