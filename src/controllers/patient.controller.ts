import { Request, Response, NextFunction } from "express";
import PatientService from "@/services/patient.service";
import { isDate } from "lodash";
import { IPatient } from "@/interfaces/patient.interface";

class PatientController {
  patientService: PatientService = new PatientService();
  index = async (req: Request, res: Response, next: NextFunction) => {
    const patients = await this.patientService.getAll();
    res.success({
      status: true,
      data: patients,
      message: "Patients loaded successfully.",
    });
  };
  getById = async (req: Request, res: Response, next: NextFunction) => {
    let { patient_id } = req.params;
    const patients = await this.patientService.getById(+patient_id);
    res.success({
      status: true,
      data: patients,
      message: "Patient loaded successfully.",
    });
  };
  getRecentPatients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const patients = await this.patientService.getRecentPatients();
    res.success({
      status: true,
      data: patients,
      message: "Patients loaded successfully.",
    });
  };

  createPatient = async (req: Request, res: Response, next: NextFunction) => {
    let patient_info: IPatient = req.body;

    console.log(patient_info.date_of_birth);
    if (!isDate(new Date(patient_info?.date_of_birth))) {
      throw new Error("Invalid date of birth.");
    }
    const patient = await this.patientService.createPatient(patient_info);
    res.success({
      status: true,
      data: patient,
      message: "Patient created successfully.",
    });
  };
  updatePatient = async (req: Request, res: Response, next: NextFunction) => {
    let { patient_id } = req.params;
    let patient_info: IPatient = req.body;

    const patient = await this.patientService.updatePatient(
      +patient_id,
      patient_info
    );
    res.success({
      status: true,
      data: patient,
      message: "Patient updated successfully.",
    });
  };
  deletePatient = async (req: Request, res: Response, next: NextFunction) => {
    let { patient_id } = req.params;

    const patient = await this.patientService.deletePatient(+patient_id);
    res.success({
      status: true,
      data: patient,
      message: "Patient deleted successfully.",
    });
  };
}
export default new PatientController();
