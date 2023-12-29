import { z } from 'nestjs-zod/z';

export const RegisterDtoSchema = z.object({
  email: z
    .string()
    .max(100, 'Maximum email length is 100 characters')
    .email('Invalid email format'),
  name: z.string().max(100, 'Maximum name length is 100 characters'),
  password: z
    .password()
    .min(8, 'Minimum password length is 8 characters')
    .max(100, 'Maximum password length is 100 characters')
    .atLeastOne('digit')
    .atLeastOne('special')
    .atLeastOne('uppercase'),
});
