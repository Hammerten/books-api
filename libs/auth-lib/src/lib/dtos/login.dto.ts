import { createZodDto } from 'nestjs-zod';
import { LoginDtoSchema } from '../schemas';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends createZodDto(LoginDtoSchema) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  deviceId: string;
}
