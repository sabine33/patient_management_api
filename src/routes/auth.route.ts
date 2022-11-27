import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/validators/auth.validator";
import { Router } from "express";
import {
  loginSchema,
  signupSchema,
  validateTokenSchema,
} from "@/validators/auth.validator";
import { validate } from "@/routes/middlewares/validation.middleware";
const router = Router();
import authController from "@/controllers/auth.controller";

export default () => {
  router.get("/", authController.index);
  router.post("/login", validate(loginSchema), authController.login);
  router.post("/signup", validate(signupSchema), authController.signup);
  router.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    authController.forgotPassword
  );
  router.post(
    "/reset-password",
    validate(resetPasswordSchema),
    authController.resetPassword
  );
  router.post(
    "/validate-token",
    validate(validateTokenSchema),
    authController.validateToken
  );
  return router;
};
