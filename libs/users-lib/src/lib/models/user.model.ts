import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserRole, UserStatus } from '@app/common';
import { IUser } from '../interfaces';

@Table({ tableName: 'users' })
export class User extends Model<User> implements IUser {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id')?.toString();
    },
  })
  id: string;

  @Unique
  @Column
  email: string;

  @Column
  name: string;

  @Column
  password: string;

  @Column({ type: DataType.ENUM(UserRole.USER) })
  role: UserRole;

  @Column({ type: DataType.ENUM(UserStatus.ACTIVE, UserStatus.INACTIVE) })
  status: UserStatus;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
