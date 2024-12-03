import { z } from 'zod';

// Login and Register schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword']
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
