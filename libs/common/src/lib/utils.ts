import { ConfigModuleOptions, ConfigObject } from '@nestjs/config';
import { Schema, ZodError } from 'nestjs-zod/z';

export function zodConfigValidation(
  schema: Schema<any>,
): ConfigModuleOptions['validate'] {
  return (config: ConfigObject) => {
    try {
      return schema.parse(config);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Config validation error ${error.message}`);
      }
      throw error;
    }
  };
}
