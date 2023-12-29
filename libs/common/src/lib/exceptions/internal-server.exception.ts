import { Exception } from './base.exception';
import { ExceptionCode } from '../enums';
import { ExceptionOptions } from '../interfaces';
import { HttpStatus } from '@nestjs/common';

const defaultMessage = 'Internal Server Error';

export class InternalServerException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: ExceptionCode.INTERNAL_SERVER_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      ...details,
    });
  }
}
