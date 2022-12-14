"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
const generic_validator_1 = require("./generic.validator");
exports.signupSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: generic_validator_1.passwordSchema,
        email: generic_validator_1.emailSchema,
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: generic_validator_1.passwordSchema,
        email: generic_validator_1.emailSchema,
    }),
});
exports.validateTokenSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.number({
            required_error: "ID is required.",
        }),
        token: zod_1.z.string({
            required_error: "Token is required.",
        }),
    }),
});
//# sourceMappingURL=auth.validator.js.map