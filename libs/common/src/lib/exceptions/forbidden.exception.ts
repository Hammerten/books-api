import { Exception } from './base.exception';
import { ExceptionCode } from '../enums';
import { ExceptionOptions } from '../interfaces';
import { HttpStatus } from '@nestjs/common';

const defaultMessage = 'Forbidden';

export class ForbiddenException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: ExceptionCode.FORBIDDEN,
      status: HttpStatus.FORBIDDEN,
      ...details,
    });
  }
}
