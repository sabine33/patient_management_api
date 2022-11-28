import MailerService from "@/services/mailer.service";
import { Service, Inject, Container } from "typedi";
import prisma from "@/loaders/prisma.loader";
import { IPatient } from "@/interfaces/patient.interface";
import { orderBy } from "lodash";

@Service("PatientService")
export default class PatientService {
  async getAll() {
    const patients = await prisma.patients.findMany({
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
    const patientsCount = await prisma.patients.aggregate({
      _count: {
        id: true,
      },
    });
    return { count: patientsCount._count.id };
  }

  async getById(patient_id: number) {
    const patient = await prisma.patients.findFirst({
      where: { id: patient_id },
    });
    if (!patient) {
      throw new Error("Patient with given id doesn't exists.");
    }
    return patient;
  }

  async createPatient(patientArg: Partial<IPatient>) {
    let {
      full_name,
      email,
      phone,
      address,
      date_of_birth,
      is_special_attention,
      avatar_filename,
      allergies,
    } = patientArg;

    let patient = await prisma.patients.findFirst({ where: { email } });

    if (patient) {
      throw new Error("Patient with given email already exists.");
    }
    let newPatient = await prisma.patients.create({
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
  async updatePatient(patient_id: number, patientData) {
    let {
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
    } = patientData;
    let patient = await prisma.patients.findFirst({
      where: { id: patient_id },
    });
    if (!patient) {
      throw new Error(
        "Patient with given email doesn't exists. Unable to update."
      );
    }
    let updatedPatient = await prisma.patients.update({
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
  async deletePatient(patient_id: number) {
    let patient = await prisma.patients.findFirst({
      where: { id: patient_id },
    });
    if (!patient) {
      throw new Error(
        "Patient with given id doesn't exists. Unable to delete."
      );
    }
    let deletedPatient = await prisma.patients.delete({
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
}
