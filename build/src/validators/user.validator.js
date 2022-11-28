"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.updateProfileSchema = void 0;
const generic_validator_1 = require("./generic.validator");
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: generic_validator_1.fullnameSchema,
        email: generic_validator_1.emailSchema,
        password: generic_validator_1.passwordSchema.optional(),
        password_again: zod_1.z
            .string({
            required_error: "Password again is also required.",
            invalid_type_error: "Password must be a valid string.",
        })
            .min(8, "Password must be 8 character long.")
            .optional(),
    }),
});
exports.updatePasswordSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        password: zod_1.z
            .string({
            required_error: "Password is required.",
            invalid_type_error: "Password must be a valid string.",
        })
            .min(8, "Password must be 8 character long."),
        password_again: zod_1.z
            .string({
            required_error: "Password again is also required.",
            invalid_type_error: "Password must be a valid string.",
        })
            .min(8, "Password must be 8 character long."),
    })
        .refine((data) => data.password === data.password_again, {
        message: "Passwords do not match.",
        path: ["passwordConfirmation"],
    }),
});
//# sourceMappingURL=user.validator.js.map