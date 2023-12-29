import { ArgumentsHost, ContextType } from '@nestjs/common';
import { Exception } from '../exceptions';
import { Response } from 'express';
import { TransportExceptionHandler } from '../interfaces';

export class HttpExceptionHandler implements TransportExceptionHandler {
  handle(exception: Exception, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.details.status).json(exception.getError());
  }

  supports(type: ContextType): boolean {
    return type === 'http';
  }
}
