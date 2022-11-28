import { isAuthenticated } from "./middlewares/auth.middleware";
import { Router } from "express";
import userController from "@/controllers/user.controller";

const router = Router();
export default () => {
  router.get("/", isAuthenticated, userController.index);
  router.get("/profile", isAuthenticated, userController.profile);

  return router;
};
