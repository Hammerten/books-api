import { createZodDto } from 'nestjs-zod';
import { FindByBookIdAndPageNoDtoSchema } from '../schemas';
import { ApiProperty } from '@nestjs/swagger';

export class FindByBookIdAndPageNoDto extends createZodDto(
  FindByBookIdAndPageNoDtoSchema,
) {
  @ApiProperty()
  bookId: string;

  @ApiProperty()
  pageNo: number;
}
