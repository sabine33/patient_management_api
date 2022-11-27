import {
  passwordSchema,
  emailSchema,
  fullnameSchema,
} from "./generic.validator";
import { z } from "zod";

export const updateProfileSchema = z.object({
  body: z.object({
    username: fullnameSchema,
    email: emailSchema,
    password: passwordSchema.optional(),
    password_again: z
      .string({
        required_error: "Password again is also required.",
        invalid_type_error: "Password must be a valid string.",
      })
      .min(8, "Password must be 8 character long.")
      .optional(),
  }),
});

export const updatePasswordSchema = z.object({
  body: z
    .object({
      password: z
        .string({
          required_error: "Password is required.",
          invalid_type_error: "Password must be a valid string.",
        })
        .min(8, "Password must be 8 character long."),
      password_again: z
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
