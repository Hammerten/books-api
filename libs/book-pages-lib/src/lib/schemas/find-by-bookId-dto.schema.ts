import { z } from 'nestjs-zod/z';

export const FindByBookIdDtoSchema = z.object({
  bookId: z.coerce.string(),
});
