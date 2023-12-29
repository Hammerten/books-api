import { DataSource } from '@app/common';
import { Module } from '@nestjs/common';
import { provideUsersRepository } from './repositories';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { UsersLibService } from './users-lib.service';
import { UtilsModule } from '@app/utils';

@Module({
  imports: [SequelizeModule.forFeature([User]), UtilsModule],
  providers: [UsersLibService, ...provideUsersRepository(DataSource.SEQUELIZE)],
  exports: [UsersLibService],
})
export class UsersLibModule {}
