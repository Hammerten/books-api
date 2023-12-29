import {
  ArgumentsHost,
  Catch,
  ContextType,
  ExceptionFilter,
  Inject,
} from '@nestjs/common';
import { Exception } from '../exceptions';
import { HttpExceptionHandler } from '../exception-handlers';
import { TransportExceptionHandler } from '../interfaces';

@Catch(Exception)
export class BaseExceptionFilter implements ExceptionFilter {
  private readonly handlers: Record<'http', TransportExceptionHandler>;

  constructor(
    @Inject(HttpExceptionHandler)
    private readonly httpExceptionHandler: HttpExceptionHandler,
  ) {
    this.handlers = {
      http: this.httpExceptionHandler,
    };
  }

  catch(exception: Exception, host: ArgumentsHost) {
    const type = host.getType<ContextType>();
    const handler = this.handlers[type];

    if (handler) {
      return handler.handle(exception, host);
    }

    throw exception;
  }
}
