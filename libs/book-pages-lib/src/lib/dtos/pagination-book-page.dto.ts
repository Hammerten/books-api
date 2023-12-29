import { createZodDto } from 'nestjs-zod';
import { PaginationBookPageDtoSchema } from '../schemas';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationInput } from '@app/common';
import { BookPageFilter } from '../interfaces';

export class PaginationBookPageDto
  extends createZodDto(PaginationBookPageDtoSchema)
  implements PaginationInput, BookPageFilter
{
  @ApiProperty({ default: 1 })
  page?: number;

  @ApiProperty({ default: 10 })
  pageSize?: number;

  @ApiPropertyOptional()
  bookId?: string;
}
