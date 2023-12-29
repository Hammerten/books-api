import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksLibModule } from '@app/books-lib';

@Module({
  imports: [BooksLibModule],
  controllers: [BooksController],
})
export class BooksModule {}
