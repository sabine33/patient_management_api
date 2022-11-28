"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientUpdateSchema = exports.patientIDSchema = exports.patientSchema = void 0;
const generic_validator_1 = require("./generic.validator");
const zod_1 = require("zod");
const addressSchema = zod_1.z
    .string({
    required_error: "Address is required.",
    invalid_type_error: "Not a valid address.",
})
    .min(5)
    .max(200);
const dobSchema = zod_1.z
    .string({
    required_error: "Date of birth is required.",
    invalid_type_error: "The data you provided is not a valid date.",
})
    .regex(new RegExp(/^(\d{4})[-\/](\d{2})[-\/](\d{2})$/), "Invalid full name.");
//select id, full_name, email, phone, address, date_of_birth, is_special_attention, added_by, created_at, updated_at, status, deleted_at from patients;
exports.patientSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: generic_validator_1.emailSchema,
        full_name: generic_validator_1.fullnameSchema,
        phone: generic_validator_1.phoneSchema,
        address: addressSchema,
        date_of_birth: dobSchema,
        is_special_attention: zod_1.z.boolean().optional(),
        status: zod_1.z.boolean().optional(),
    }),
});
exports.patientIDSchema = zod_1.z.object({
    params: zod_1.z.object({
        patient_id: (0, generic_validator_1.numericKeySchema)("Patient ID must be a number."),
    }),
});
exports.patientUpdateSchema = zod_1.z.object({
    // params: patientIDSchema,
    body: zod_1.z.object({
        email: generic_validator_1.emailSchema.optional(),
        full_name: generic_validator_1.fullnameSchema.optional(),
        phone: generic_validator_1.phoneSchema.optional(),
        address: addressSchema.optional(),
        date_of_birth: dobSchema.optional(),
        is_special_attention: zod_1.z.boolean().optional(),
        status: zod_1.z.boolean().optional(),
    }),
});
//# sourceMappingURL=patient.validator.js.map