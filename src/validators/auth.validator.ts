import { z } from "zod";
import {
  emailSchema,
  fullnameSchema,
  passwordSchema,
} from "./generic.validator";

export const signupSchema = z.object({
  body: z.object({
    password: passwordSchema,
    email: emailSchema,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    password: passwordSchema,
    email: emailSchema,
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: emailSchema,
  }),
});
export const resetPasswordSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
    token: z.string({
      required_error: "Token is required.",
    }),
  }),
});
export const validateTokenSchema = z.object({
  body: z.object({
    id: z.number({
      required_error: "ID is required.",
    }),
    token: z.string({
      required_error: "Token is required.",
    }),
  }),
});
