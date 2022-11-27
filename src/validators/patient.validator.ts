import {
  passwordSchema,
  emailSchema,
  phoneSchema,
  fullnameSchema,
  numberSchema,
  numericKeySchema,
} from "./generic.validator";
import { z } from "zod";

const addressSchema = z
  .string({
    required_error: "Address is required.",
    invalid_type_error: "Not a valid address.",
  })
  .min(5)
  .max(200);

const dobSchema = z
  .string({
    required_error: "Date of birth is required.",
    invalid_type_error: "The data you provided is not a valid date.",
  })
  .regex(new RegExp(/^(\d{4})[-\/](\d{2})[-\/](\d{2})$/), "Invalid full name.");

//select id, full_name, email, phone, address, date_of_birth, is_special_attention, added_by, created_at, updated_at, status, deleted_at from patients;
export const patientSchema = z.object({
  body: z.object({
    email: emailSchema,
    full_name: fullnameSchema,
    phone: phoneSchema,
    address: addressSchema,
    date_of_birth: dobSchema,
    is_special_attention: z.boolean().optional(),
    status: z.boolean().optional(),
  }),
});

export const patientIDSchema = z.object({
  params: z.object({
    patient_id: numericKeySchema("Patient ID must be a number."),
  }),
});

export const patientUpdateSchema = z.object({
  // params: patientIDSchema,
  body: z.object({
    email: emailSchema.optional(),
    full_name: fullnameSchema.optional(),
    phone: phoneSchema.optional(),
    address: addressSchema.optional(),
    date_of_birth: dobSchema.optional(),
    is_special_attention: z.boolean().optional(),
    status: z.boolean().optional(),
  }),
});
