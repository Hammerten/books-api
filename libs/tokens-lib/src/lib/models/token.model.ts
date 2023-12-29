import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { IToken } from '../interfaces';
import { User } from '@app/users-lib';

@Table({ tableName: 'tokens' })
export class Token extends Model<Token> implements IToken {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id')?.toString();
    },
  })
  id: string;

  @Column
  accessToken: string;

  @Column
  refreshToken: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @Column
  deviceId: string;

  @BelongsTo(() => User)
  user: User;

  @Column
  expiredAt: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
