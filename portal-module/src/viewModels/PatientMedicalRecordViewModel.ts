import {PatientMedicalRecordsDto} from "../dtos/PatientMedicalRecordDto";

export interface PatientMedicalRecordViewModel {
    recordNumber: number;
    allergies: string;
    medicalConditions: string;
    fullName: string;
}

export const mapPatientMedicalRecordDtoToViewModel = (dto: PatientMedicalRecordsDto): PatientMedicalRecordViewModel => ({
    recordNumber: dto.recordNumber,
    allergies: dto.allergies,
    medicalConditions: dto.medicalConditions,
    fullName: dto.fullName,
});