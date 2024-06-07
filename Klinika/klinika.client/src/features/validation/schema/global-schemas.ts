import {z} from "zod";
import {FormField} from "../../handata/utils/form-fields";

// FORMAL TEXT
const textSchema = z
    .string()
    .max(64, "Field should not exceed 64 characters")
    .refine((value) => value && value.length > 0, {
        message: "Field is required",
    })
    .refine((value) => value && value[0] === value[0].toUpperCase(), {
        message: "Field should start with an uppercase letter",
    });
// .refine((value) => value && !value.includes(" "), {
//   message: "Field should not contain spaces",
// });

const textareaSchema = z
    .string()
    .max(144, "Field should not exceed 144 characters")
    .refine((value) => value && value.length > 0, {
        message: "Field is required",
    })
    .refine((value) => value && value[0] === value[0].toUpperCase(), {
        message: "Field should start with an uppercase letter",
    });

const emailSchema = z
    .string()
    .email("Invalid email address")
    .refine((value) => value.length > 0, {
        message: "Email is required",
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
const selectSchema = z
    .any();

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z
    .any()
// .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
// .refine(
//     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//     "Only .jpg, .jpeg, .png and .webp formats are supported."
// );

const passwordSchema = z
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
    });

// PLAIN DATE
const dateSchema = z.string();

const hiddenSchema = z.any();

const schemaMap: Record<string, T> = {
    plain_text: plainTextSchema,
    text: textSchema,
    textarea: textareaSchema,
    number: numberSchema,
    date: dateSchema,
    select: selectSchema,
    age: ageSchema,
    email: emailSchema,
    file: fileSchema,
    password: passwordSchema,
    hidden: hiddenSchema,
};

const createGlobalSchema = (fields: FormField[]) => {
    const globalSchemaFields = fields.map((field) => {
        if (!schemaMap[field.type]) {
            throw new Error(`No schema found for field type "${field.type}"`);
        }
        return {
            [field.identifier]: schemaMap[field.type],
        };
    });

    return z.object(Object.assign({}, ...globalSchemaFields));
};

export {createGlobalSchema};
