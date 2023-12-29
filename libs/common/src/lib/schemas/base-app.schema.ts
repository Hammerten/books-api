import { z } from 'nestjs-zod/z';

export const BaseAppSchema = z.object({
  PORT: z.string(),
  SERVICE_NAME: z.string(),
  BOOKS_DB_SCHEMA: z.string(),
  BOOKS_DB_DIALECT: z.string(),
  BOOKS_DB_HOST: z.string(),
  BOOKS_DB_USERNAME: z.string(),
  BOOKS_DB_PASSWORD: z.string(),
  BOOKS_DB_PORT: z.string(),
  BOOKS_DB_DATABASE: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});
