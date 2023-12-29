import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBookDtoSchema } from '../schemas';
import { CreateBookPageDto } from './create-book-page.dto';

export class CreateBookDto extends createZodDto(CreateBookDtoSchema) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  pages: CreateBookPageDto[];
}
