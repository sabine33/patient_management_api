import { Router } from "express";
import { loginSchema, signupSchema } from "@/validators/auth.validator";
import { validate } from "@/routes/middlewares/validation.middleware";
const router = Router();
import authController from "@/controllers/auth.controller";

export default () => {
  router.get("/", authController.index);
  router.post("/login", validate(loginSchema), authController.login);
  router.post("/token", authController.regenerateToken);
  router.post("/signup", validate(signupSchema), authController.signup);
  return router;
};
