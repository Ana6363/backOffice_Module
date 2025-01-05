

export interface PatientMedicalRecordsDto {
    recordNumber: string;
    allergies: { $values: string[] }; // Update to reflect the actual structure
    medicalConditions: { $values: string[] }; // Update to reflect the actual structure
}