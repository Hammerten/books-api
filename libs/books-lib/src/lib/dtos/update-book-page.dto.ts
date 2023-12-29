import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateBookPageDtoSchema } from '../schemas';

export class UpdateBookPageDto extends createZodDto(UpdateBookPageDtoSchema) {
  @ApiProperty({ type: 'object', format: 'json' })
  data: string;
}
