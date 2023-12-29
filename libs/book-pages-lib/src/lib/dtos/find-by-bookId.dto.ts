import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { FindByBookIdDtoSchema } from '../schemas';

export class FindByBookIdDto extends createZodDto(FindByBookIdDtoSchema) {
  @ApiProperty()
  bookId: string;
}
