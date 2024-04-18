import { z } from "zod";
import { FormField } from "../../handata/components/CreateForm";

// FORMAL TEXT
const textSchema = z
  .string()
  .max(64, "Field should not exceed 64 characters")
  .refine((value) => value && value.length > 0, {
    message: "Field is required",
  })
  .refine((value) => value && value[0] === value[0].toUpperCase(), {
    message: "Field should start with an uppercase letter",
  })
  .refine((value) => value && !value.includes(" "), {
    message: "Field should not contain spaces",
  });

// PLAIN TEXT
const plainTextSchema = z
  .string()
  .refine((value) => value && value.length > 0, {
    message: "Field is required",
  });

// NUMBER
const numberSchema = z.number().refine((value) => value && value > 0, {
  message: "Field is required",
});

// AGE
const ageSchema = z
  .string()
  .refine((value) => value.length > 0, {
    message: "Age is required",
  })
  .refine((value) => new Date(value) <= new Date(), {
    message: "Age cannot be from a future date",
  });

// PLAIN SELECT
const selectSchema = z.string().refine((value) => value.length > 0, {
  message: "Selecting is required",
});

// PLAIN DATE
const dateSchema = z.string();

const schemaMap: Record<string, any> = {
  plain_text: plainTextSchema,
  text: textSchema,
  number: numberSchema,
  date: dateSchema,
  select: selectSchema,
  age: ageSchema,
};

const createGlobalSchema = (fields: FormField[]) => {
  const globalSchemaFields = fields.map((field) => ({
    [field.identifier]: schemaMap[field.type],
  }));

  return z.object(Object.assign({}, ...globalSchemaFields));
};

export { createGlobalSchema };
