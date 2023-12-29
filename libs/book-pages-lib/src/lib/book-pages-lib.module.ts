import { BookPage, BookPageRead } from './models';
import { BookPagesLibService } from './book-pages-lib.service';
import { DataSource } from '@app/common';
import { Module } from '@nestjs/common';
import {
  provideBookPagesReadRepository,
  provideBookPagesRepository,
} from './repositories';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([BookPage, BookPageRead])],
  providers: [
    BookPagesLibService,
    ...provideBookPagesRepository(DataSource.SEQUELIZE),
    ...provideBookPagesReadRepository(DataSource.SEQUELIZE),
  ],
  exports: [BookPagesLibService],
})
export class BookPagesLibModule {}
