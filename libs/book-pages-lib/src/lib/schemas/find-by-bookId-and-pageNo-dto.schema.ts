import { z } from 'nestjs-zod/z';

export const FindByBookIdAndPageNoDtoSchema = z.object({
  bookId: z.string().optional(),
  pageNo: z.coerce.number().optional(),
});
