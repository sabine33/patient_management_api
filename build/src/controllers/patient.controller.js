"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patient_service_1 = __importDefault(require("@/services/patient.service"));
const lodash_1 = require("lodash");
class PatientController {
    constructor() {
        this.patientService = new patient_service_1.default();
        this.index = async (req, res, next) => {
            const patients = await this.patientService.getAll();
            res.success({
                status: true,
                data: patients,
                message: "Patients loaded successfully.",
            });
        };
        this.getById = async (req, res, next) => {
            let { patient_id } = req.params;
            const patients = await this.patientService.getById(+patient_id);
            res.success({
                status: true,
                data: patients,
                message: "Patient loaded successfully.",
            });
        };
        this.getStats = async (req, res, next) => {
            const stats = await this.patientService.getStats();
            res.success({
                status: true,
                data: stats,
                message: "Patients stats loaded successfully.",
            });
        };
        this.createPatient = async (req, res, next) => {
            let patient_info = req.body;
            console.log(patient_info.date_of_birth);
            if (!(0, lodash_1.isDate)(new Date(patient_info === null || patient_info === void 0 ? void 0 : patient_info.date_of_birth))) {
                throw new Error("Invalid date of birth.");
            }
            const patient = await this.patientService.createPatient(patient_info);
            res.success({
                status: true,
                data: patient,
                message: "Patient created successfully.",
            });
        };
        this.updatePatient = async (req, res, next) => {
            let { patient_id } = req.params;
            let patient_info = req.body;
            const patient = await this.patientService.updatePatient(+patient_id, patient_info);
            res.success({
                status: true,
                data: patient,
                message: "Patient updated successfully.",
            });
        };
        this.deletePatient = async (req, res, next) => {
            let { patient_id } = req.params;
            const patient = await this.patientService.deletePatient(+patient_id);
            res.success({
                status: true,
                data: patient,
                message: "Patient deleted successfully.",
            });
        };
    }
}
exports.default = new PatientController();
//# sourceMappingURL=patient.controller.js.map