import { z } from 'nestjs-zod/z';

export const PaginationDtoSchema = z.object({
  page: z.coerce.number().positive().max(100).default(1),
  pageSize: z.coerce.number().positive().default(10),
});
