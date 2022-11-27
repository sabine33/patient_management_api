import { z } from "zod";

export const fullnameSchema = z
  .string({ required_error: "Name is required." })
  .min(4, "Name must be 4 character long")
  .max(100, "Name must not be larger than 100 character long.")
  .regex(new RegExp(/^[ A-Za-z0-9_@./#&+-]*$/), "Invalid full name.");

export const passwordSchema = z
  .string({
    required_error: "Password is required.",
    invalid_type_error: "Password must be a valid string.",
  })
  .min(8, "Password must be 8 character long.");

export const emailSchema = z
  .string({
    required_error: "Email is required.",
  })
  .email("Not a valid email.");

export const phoneSchema = z
  .string({
    required_error: `Phone number is required.`,
  })
  .min(9)
  .max(20)
  .regex(new RegExp(/^[+0-9]*$/), "Invalid phone number");

export const numberSchema = (title) =>
  z
    .number({
      required_error: `${title} is required.`,
    })
    .positive();

export const numericKeySchema = (title) =>
  z
    .string({
      required_error: `${title} is required.`,
    })
    .regex(/^[1-9]\d*$/, `${title} must be a number`);
