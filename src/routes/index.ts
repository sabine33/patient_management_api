import { Request, Router } from "express";
import authRoutes from "./auth.route";
import docsRoutes from "./docs.route";
import helloRoutes from "./hello.route";
import patientRoute from "./patient.route";
import uploadRoutes from "./upload.route";
import userRoutes from "./user.route";

export default () => {
  const app = Router();
  app.use("/", helloRoutes());
  app.use("/users", userRoutes());
  app.use("/auth", authRoutes());
  app.use("/patients", patientRoute());
  app.use("/docs", docsRoutes());
  app.use("/uploads", uploadRoutes());
  return app;
};
