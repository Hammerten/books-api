import { UserRole, UserStatus } from '@app/common';

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BaseUser = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
