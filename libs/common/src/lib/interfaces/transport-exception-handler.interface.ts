import { ArgumentsHost, ContextType } from '@nestjs/common';
import { Exception } from '../exceptions';
import { Observable } from 'rxjs';

export interface TransportExceptionHandler {
  handle(exception: Exception, host: ArgumentsHost): any | Observable<any>;
  supports(type: ContextType): boolean;
}
