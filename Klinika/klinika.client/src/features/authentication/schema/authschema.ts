import { z } from "zod";

const schema_login = z.object({
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
  remember_me: z.boolean(),
});

const schema_register = z
  .object({
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
    confirm_password: z
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
    age: z
      .string()
      .refine((value) => value.length > 0, {
        message: "Age is required",
      })
      .refine((value) => new Date(value) <= new Date(), {
        message: "Age cannot be from a future date",
      }),
    gender: z
      .string()
      .refine((value) => value.length > 0, {
        message: "Gender is required",
      })
      .refine((value) => value === "male" || value === "female", {
        message: "Gender must be male or female",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export { schema_login, schema_register };
