import { z } from 'nestjs-zod/z';

export const RefreshTokenDtoSchema = z.object({
  token: z.string(),
});
