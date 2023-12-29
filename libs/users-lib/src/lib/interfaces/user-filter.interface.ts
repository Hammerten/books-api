import { UserStatus } from '@app/common';

export interface UserFilter {
  status: UserStatus;
  name: string;
}
