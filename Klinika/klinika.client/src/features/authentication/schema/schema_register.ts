import { z } from "zod";

export const schema_register = z.object({
  first_name: z
    .string()
    .max(12, "First name should not exceed 12 characters")
    .refine((value) => value && value.length > 0, {
      message: "First name is required",
    })
    .refine((value) => value && value[0] === value[0].toUpperCase(), {
      message: "First name should start with an uppercase letter",
    })
    .refine((value) => value && !value.includes(" "), {
      message: "First name should not contain spaces",
    }),
  last_name: z
    .string()
    .max(12, "Last name should not exceed 12 characters")
    .refine((value) => value && value.length > 0, {
      message: "Last name is required",
    })
    .refine((value) => value && value[0] === value[0].toUpperCase(), {
      message: "Last name should start with an uppercase letter",
    })
    .refine((value) => value && !value.includes(" "), {
      message: "Last name should not contain spaces",
    }),
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
    }),
  age: z
    .string()
    .refine((value) => value.length > 0, {
      message: "Age is required",
    })
    .refine((value) => new Date(value) <= new Date(), {
      message: "Age cannot be from a future date",
    }),
});
