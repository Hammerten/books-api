import { z } from 'nestjs-zod/z';

export const LoginDtoSchema = z.object({
  email: z
    .string()
    .max(100, 'Maximum email length is 100 characters')
    .email('Invalid email format'),
  password: z.password().min(1, 'Password can not be empty'),
  deviceId: z.string().min(10).max(100),
});
