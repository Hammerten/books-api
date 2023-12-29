import { createZodDto } from 'nestjs-zod';
import { RefreshTokenDtoSchema } from '../schemas';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto extends createZodDto(RefreshTokenDtoSchema) {
  @ApiProperty()
  token: string;
}
