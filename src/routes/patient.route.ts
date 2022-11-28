import { isAuthenticated } from "./middlewares/auth.middleware";
import { Router } from "express";
import patientController from "@/controllers/patient.controller";

import { validate } from "./middlewares/validation.middleware";
import {
  patientSchema,
  patientIDSchema,
  patientUpdateSchema,
} from "@/validators/patient.validator";

const router = Router();
export default () => {
  router.get("/", isAuthenticated, patientController.index);

  router.get("/info/stats", isAuthenticated, patientController.getStats);

  router.post(
    "/",
    isAuthenticated,
    validate(patientSchema),
    patientController.createPatient
  );
  router.get(
    "/:patient_id",
    isAuthenticated,
    validate(patientIDSchema),
    patientController.getById
  );
  router.put(
    "/:patient_id",
    isAuthenticated,
    validate(patientUpdateSchema),
    patientController.updatePatient
  );
  router.delete(
    "/:patient_id",
    isAuthenticated,
    validate(patientIDSchema),
    patientController.deletePatient
  );

  return router;
};
