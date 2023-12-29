import { Exception } from './base.exception';
import { ExceptionCode } from '../enums';
import { ExceptionOptions } from '../interfaces';
import { HttpStatus } from '@nestjs/common';

const defaultMessage = 'Not Found';

export class NotFoundException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: ExceptionCode.NOT_FOUND,
      status: HttpStatus.NOT_FOUND,
      ...details,
    });
  }
}
