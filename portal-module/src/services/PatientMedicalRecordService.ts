import {PatientMedicalRecordsDto, PatientMedicalRecordUpdateDto} from "../dtos/PatientMedicalRecordDto";

const API_URL = `https://api-dotnet.hospitalz.site/api/v1/patient-medical-records`;

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const updatePatientMedicalRecord = async (medicalRecordData: PatientMedicalRecordUpdateDto): Promise<PatientMedicalRecordsDto> => {
    const url = `${API_URL}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(medicalRecordData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update patient medical record: ${errorText}`);
    }

    return await response.json();
};

export const fetchPatientMedicalRecord = async (): Promise<PatientMedicalRecordsDto> => {
    const url = `${API_URL}`;


    try {
        console.debug('Fetching patient medical records from URL:', url);
        console.debug('Headers being sent:', getHeaders());

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
        });

        console.debug('Response received with status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Failed to fetch patient medical records: ${errorText}`);
        }

        const responseData = await response.json();
        console.debug('Parsed response data:', responseData);

        return responseData.data?.$values || [];
    } catch (error) {
        console.error('An error occurred while fetching patient medical records:', error);
        throw error;
    }
};
