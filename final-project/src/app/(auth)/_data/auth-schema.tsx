import { z } from "zod";

// Login and Register schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const otpSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const EmailforgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export const forgotPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
