import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersLibModule } from '@app/users-lib';

@Module({
  imports: [UsersLibModule],
  controllers: [UsersController],
})
export class UsersModule {}
