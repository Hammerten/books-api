import { z } from 'nestjs-zod/z';

export const CreateBookPageDtoSchema = z.object({
  data: z.any(),
});
