import { Book } from './models';
import { BooksLibService } from './books-lib.service';
import { DataSource } from '@app/common';
import { Module } from '@nestjs/common';
import { provideBooksRepository } from './repositories';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@app/users-lib';

@Module({
  imports: [SequelizeModule.forFeature([Book, User])],
  providers: [BooksLibService, ...provideBooksRepository(DataSource.SEQUELIZE)],
  exports: [BooksLibService],
})
export class BooksLibModule {}
