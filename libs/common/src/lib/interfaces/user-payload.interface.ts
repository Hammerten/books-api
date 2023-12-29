import { jwtPayload } from '@app/tokens-lib';
import { IBaseUser } from './base-user.interface';
import { AuthorizationStatusEnum } from '../enums';

export interface UserPayload {
  data: IBaseUser;
  payload: jwtPayload;
  authorizationStatus: AuthorizationStatusEnum;
}
