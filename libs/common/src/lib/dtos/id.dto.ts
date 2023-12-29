import { createZodDto } from 'nestjs-zod';
import { IdDtoSchema } from '../schemas';
import { ApiProperty } from '@nestjs/swagger';

export class IdDto extends createZodDto(IdDtoSchema) {
  @ApiProperty()
  id: string;
}
