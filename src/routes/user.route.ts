import { isAuthenticated } from "./middlewares/auth.middleware";
import { Router } from "express";
import userController from "@/controllers/user.controller";

import {
  updateProfileSchema,
  updatePasswordSchema,
} from "@/validators/user.validator";
import { validate } from "./middlewares/validation.middleware";

const router = Router();
export default () => {
  router.get("/", isAuthenticated, userController.index);
  router.get("/dashboard", isAuthenticated, userController.getDashboardSummary);
  router.get("/profile", isAuthenticated, userController.profile);
  router.put(
    "/profile",
    isAuthenticated,
    validate(updateProfileSchema),
    userController.updateProfile
  );
  router.put(
    "/update-password",
    isAuthenticated,
    validate(updatePasswordSchema),
    userController.updatePassword
  );
  return router;
};
