import { createZodDto } from 'nestjs-zod';
import { PaginationDtoSchema } from '../schemas';
import { PaginationInput } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto
  extends createZodDto(PaginationDtoSchema)
  implements PaginationInput
{
  @ApiProperty({ default: 1 })
  page?: number;

  @ApiProperty({ default: 10 })
  pageSize?: number;
}
