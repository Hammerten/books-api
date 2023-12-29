import { createZodDto } from 'nestjs-zod';
import { RegisterDtoSchema } from '../schemas';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends createZodDto(RegisterDtoSchema) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}
