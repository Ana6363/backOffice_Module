import {PatientMedicalRecordsDto} from "../dtos/PatientMedicalRecordDto";

export interface PatientMedicalRecordViewModel {
    recordNumber: string;
    allergies: string;
    medicalConditions: string;

}

export const mapPatientMedicalRecordDtoToViewModel = (dto: PatientMedicalRecordsDto): PatientMedicalRecordViewModel => ({
    recordNumber: dto.recordNumber,
    allergies: dto.allergies?.$values?.length ? dto.allergies.$values.join(", ") : "None",
    medicalConditions: dto.medicalConditions?.$values?.length ? dto.medicalConditions.$values.join(", ") : "None",

});

