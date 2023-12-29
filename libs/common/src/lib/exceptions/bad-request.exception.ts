import { Exception } from './base.exception';
import { ExceptionCode } from '../enums';
import { ExceptionOptions } from '../interfaces';
import { HttpStatus } from '@nestjs/common';

const defaultMessage = 'Bad request';

export class BadRequestException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: ExceptionCode.BAD_REQUEST,
      status: HttpStatus.BAD_REQUEST,
      ...details,
    });
  }
}
