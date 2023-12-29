import { z } from 'nestjs-zod/z';

export const IdDtoSchema = z.object({
  id: z.string(),
});
