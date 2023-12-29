import { z } from 'nestjs-zod/z';

export const UpdateBookPageDtoSchema = z.object({
  data: z.any(),
});
