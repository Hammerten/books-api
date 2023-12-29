import { Catch, ExceptionFilter } from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { BadRequestException } from '../exceptions';

@Catch(ZodValidationException)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException) {
    const error = exception.getZodError();
    throw new BadRequestException({ errors: error.errors });
  }
}
