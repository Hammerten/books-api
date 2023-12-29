import { Module } from '@nestjs/common';
import { BookPagesController } from './book-pages.controller';
import { BookPagesLibModule } from '@app/book-pages-lib';

@Module({
  imports: [BookPagesLibModule],
  controllers: [BookPagesController],
})
export class BookPagesModule {}
