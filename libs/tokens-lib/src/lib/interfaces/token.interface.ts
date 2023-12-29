export interface IToken {
  id: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
  deviceId: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type BaseToken = Omit<IToken, 'id' | 'updatedAt' | 'createdAt'>;
