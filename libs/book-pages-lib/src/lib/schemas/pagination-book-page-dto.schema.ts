import { z } from 'nestjs-zod/z';
import { PaginationDtoSchema } from '@app/common';

export const PaginationBookPageDtoSchema = PaginationDtoSchema.extend({
  bookId: z.string().optional(),
});
