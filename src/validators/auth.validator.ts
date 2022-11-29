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
