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
    .union([z.string(), z.number()])
    .refine((value) => value !== "select", {
        message: "Please select a type",
    });

const fileSchema = z
    .string()
    .refine((value) => /\.(jpe?g|png|gif)$/i.test(value), {
        message: "File must be a .jpeg, .jpg, .png, or .gif image",
    });

// PLAIN DATE
const dateSchema = z.string();

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
};

// const createGlobalSchema = (fields: FormField[]) => {
//     const globalSchemaFields = fields.map((field) => ({
//         [field.identifier]: schemaMap[field.type],
//     }));
//
//     return z.object(Object.assign({}, ...globalSchemaFields));
// };

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
