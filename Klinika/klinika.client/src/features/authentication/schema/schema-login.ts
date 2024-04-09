import { z } from "zod";

export const schema_login = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .refine((value) => value.length > 0, {
      message: "Email is required",
    }),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters long")
    .refine((value) => value.length > 0, {
      message: "Password is required",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one digit",
    })
    .refine((value) => /\W|_/.test(value), {
      message: "Password must contain at least one special character",
    }),
});
