import { Request, Router } from "express";
import authRoutes from "./auth.route";
import docsRoutes from "./docs.route";
import helloRoutes from "./hello.route";
import patientRoute from "./patient.route";
import uploadRoutes from "./upload.route";
import userRoutes from "./user.route";

export default () => {
  const router = Router();
  router.use("/", helloRoutes());
  router.use("/users", userRoutes());
  router.use("/auth", authRoutes());
  router.use("/patients", patientRoute());
  router.use("/docs", docsRoutes());
  router.use("/uploads", uploadRoutes());
  return router;
};
