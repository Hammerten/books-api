import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateBookDtoSchema } from '../schemas';
import { UpdateBookPageDto } from './update-book-page.dto';

export class UpdateBookDto extends createZodDto(UpdateBookDtoSchema) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  pages: UpdateBookPageDto[];
}
