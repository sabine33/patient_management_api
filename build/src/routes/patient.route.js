"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./middlewares/auth.middleware");
const express_1 = require("express");
const patient_controller_1 = __importDefault(require("@/controllers/patient.controller"));
const validation_middleware_1 = require("./middlewares/validation.middleware");
const patient_validator_1 = require("@/validators/patient.validator");
const router = (0, express_1.Router)();
exports.default = () => {
    router.get("/", auth_middleware_1.isAuthenticated, patient_controller_1.default.index);
    router.get("/info/stats", auth_middleware_1.isAuthenticated, patient_controller_1.default.getStats);
    router.post("/", auth_middleware_1.isAuthenticated, (0, validation_middleware_1.validate)(patient_validator_1.patientSchema), patient_controller_1.default.createPatient);
    router.get("/:patient_id", auth_middleware_1.isAuthenticated, (0, validation_middleware_1.validate)(patient_validator_1.patientIDSchema), patient_controller_1.default.getById);
    router.put("/:patient_id", auth_middleware_1.isAuthenticated, (0, validation_middleware_1.validate)(patient_validator_1.patientUpdateSchema), patient_controller_1.default.updatePatient);
    router.delete("/:patient_id", auth_middleware_1.isAuthenticated, (0, validation_middleware_1.validate)(patient_validator_1.patientIDSchema), patient_controller_1.default.deletePatient);
    return router;
};
//# sourceMappingURL=patient.route.js.map