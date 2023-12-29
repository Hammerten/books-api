import { Exception } from './base.exception';
import { ExceptionCode } from '../enums';
import { ExceptionOptions } from '../interfaces';
import { HttpStatus } from '@nestjs/common';

const defaultMessage = 'Unauthorized';

export class UnauthorizedException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: ExceptionCode.UNAUTHORIZED,
      status: HttpStatus.UNAUTHORIZED,
      ...details,
    });
  }
}
