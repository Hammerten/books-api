import { Exception } from './base.exception';
import { ExceptionCode } from '../enums';
import { ExceptionOptions } from '../interfaces';
import { HttpStatus } from '@nestjs/common';

const defaultMessage = 'Validation error';

export class ValidationErrorException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(details.message || defaultMessage, {
      code: ExceptionCode.VALIDATION_ERROR,
      status: HttpStatus.FORBIDDEN,
      ...details,
    });
  }
}
