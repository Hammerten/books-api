import { createZodValidationPipe } from 'nestjs-zod';
import { ZodError, ZodFormattedError } from 'nestjs-zod/z';
import { ValidationErrorException } from '../exceptions';

const errorFormatter = (error: ZodError) => {
  const zodFormattedError = error.format();
  const { _errors, ...rest } = zodFormattedError as ZodFormattedError<string> &
    Record<string, { _errors: string[] }>;
  const formattedError: Record<string, { messages: string[] }> = {};

  Object.entries(rest).forEach(
    ([key, value]) => (formattedError[key] = { messages: value._errors }),
  );

  return formattedError;
};

export const CommonZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) => {
    return new ValidationErrorException({ errors: errorFormatter(error) });
  },
});
