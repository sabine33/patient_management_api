"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numericKeySchema = exports.numberSchema = exports.phoneSchema = exports.emailSchema = exports.passwordSchema = exports.fullnameSchema = void 0;
const zod_1 = require("zod");
exports.fullnameSchema = zod_1.z
    .string({ required_error: "Name is required." })
    .min(4, "Name must be 4 character long")
    .max(100, "Name must not be larger than 100 character long.")
    .regex(new RegExp(/^[ A-Za-z0-9_@./#&+-]*$/), "Invalid full name.");
exports.passwordSchema = zod_1.z
    .string({
    required_error: "Password is required.",
    invalid_type_error: "Password must be a valid string.",
})
    .min(8, "Password must be 8 character long.");
exports.emailSchema = zod_1.z
    .string({
    required_error: "Email is required.",
})
    .email("Not a valid email.");
exports.phoneSchema = zod_1.z
    .string({
    required_error: `Phone number is required.`,
})
    .min(9)
    .max(20)
    .regex(new RegExp(/^[+0-9]*$/), "Invalid phone number");
const numberSchema = (title) => zod_1.z
    .number({
    required_error: `${title} is required.`,
})
    .positive();
exports.numberSchema = numberSchema;
const numericKeySchema = (title) => zod_1.z
    .string({
    required_error: `${title} is required.`,
})
    .regex(/^[1-9]\d*$/, `${title} must be a number`);
exports.numericKeySchema = numericKeySchema;
//# sourceMappingURL=generic.validator.js.map