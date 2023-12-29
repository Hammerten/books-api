import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBookPageDtoSchema } from '../schemas';

export class CreateBookPageDto extends createZodDto(CreateBookPageDtoSchema) {
  @ApiProperty({ type: 'object', format: 'json' })
  data: string;
}
