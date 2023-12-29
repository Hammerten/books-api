import { z } from 'nestjs-zod/z';
import { CreateBookPageDtoSchema } from './create-book-page-dto.schema';

export const UpdateBookDtoSchema = z.object({
  title: z
    .string()
    .min(2, 'Minimum title length is 2')
    .max(50, 'Maximum title length is 50'),
  pages: z.array(CreateBookPageDtoSchema).min(1, 'Must have at least one page'),
});
