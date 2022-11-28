"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const prisma_loader_1 = __importDefault(require("@/loaders/prisma.loader"));
let PatientService = class PatientService {
    async getAll() {
        const patients = await prisma_loader_1.default.patients.findMany({
            orderBy: [
                {
                    is_special_attention: "desc",
                },
                {
                    id: "desc",
                },
                {
                    full_name: "asc",
                },
            ],
        });
        return patients;
    }
    async getStats() {
        const patientsCount = await prisma_loader_1.default.patients.aggregate({
            _count: {
                id: true,
            },
        });
        return { count: patientsCount._count.id };
    }
    async getById(patient_id) {
        const patient = await prisma_loader_1.default.patients.findFirst({
            where: { id: patient_id },
        });
        if (!patient) {
            throw new Error("Patient with given id doesn't exists.");
        }
        return patient;
    }
    async createPatient(patientArg) {
        let { full_name, email, phone, address, date_of_birth, is_special_attention, avatar_filename, allergies, } = patientArg;
        let patient = await prisma_loader_1.default.patients.findFirst({ where: { email } });
        if (patient) {
            throw new Error("Patient with given email already exists.");
        }
        let newPatient = await prisma_loader_1.default.patients.create({
            data: {
                full_name,
                email,
                phone,
                address,
                date_of_birth,
                is_special_attention,
                avatar_filename,
                allergies,
            },
        });
        return newPatient;
    }
    async updatePatient(patient_id, patientData) {
        let { full_name, email, phone, address, date_of_birth, is_special_attention, added_by, status, avatar_filename, allergies, } = patientData;
        let patient = await prisma_loader_1.default.patients.findFirst({
            where: { id: patient_id },
        });
        if (!patient) {
            throw new Error("Patient with given email doesn't exists. Unable to update.");
        }
        let updatedPatient = await prisma_loader_1.default.patients.update({
            where: {
                id: patient.id,
            },
            data: {
                full_name,
                email,
                phone,
                address,
                date_of_birth,
                is_special_attention,
                added_by,
                status,
                avatar_filename,
                allergies,
            },
        });
        return updatedPatient;
    }
    async deletePatient(patient_id) {
        let patient = await prisma_loader_1.default.patients.findFirst({
            where: { id: patient_id },
        });
        if (!patient) {
            throw new Error("Patient with given id doesn't exists. Unable to delete.");
        }
        let deletedPatient = await prisma_loader_1.default.patients.delete({
            where: {
                id: patient.id,
            },
            select: {
                full_name: true,
                email: true,
                id: true,
            },
        });
        return deletedPatient;
    }
};
PatientService = __decorate([
    (0, typedi_1.Service)("PatientService")
], PatientService);
exports.default = PatientService;
//# sourceMappingURL=patient.service.js.map