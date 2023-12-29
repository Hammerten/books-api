import { Exception } from './base.exception';
import { ExceptionCode } from '../enums';
import { ExceptionOptions } from '../interfaces';
import { HttpStatus } from '@nestjs/common';

const defaultMessage = 'Expired access token';

export class ExpiredAccessTokenException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: ExceptionCode.EXPIRED_ACCESS_TOKEN,
      status: HttpStatus.NOT_FOUND,
      ...details,
    });
  }
}
