import {PatientMedicalRecordsDto} from "../dtos/PatientMedicalRecordDto";

const API_URL = `https://api-dotnet.hospitalz.site/api/v1/patient-medical-record`;

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const fetchAllPatientMedicalRecord = async (): Promise<PatientMedicalRecordsDto[]> => {
    const url = `${API_URL}`;

    try {
        console.debug('Fetching patient medical records from URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
        });

        console.debug('Response received with status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Failed to fetch patient medical records: ${errorText || "Unknown error"}`);
        }

        const responseData = await response.json();
        console.debug('Parsed response data:', responseData);

        // Extract the $values array safely
        const records = responseData.data?.$values || [];
        console.debug('Extracted records:', records);

        return records;
    } catch (error) {
        console.error('An error occurred while fetching patient medical records:', error);
        throw error;
    }
};


export const updatePatientMedicalRecord = async (
    medicalRecordData: PatientMedicalRecordsDto
): Promise<PatientMedicalRecordsDto> => {
    const url = `${API_URL}`;

    // Prepare the payload for the backend
    const payload = {
        recordNumber: medicalRecordData.recordNumber,
        allergies: medicalRecordData.allergies?.$values || [], // Convert $values to a flat array
        medicalConditions: medicalRecordData.medicalConditions?.$values || [], // Convert $values to a flat array
    };

    console.log("Payload being sent to the backend:", payload);

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend responded with an error:", errorText);
        throw new Error(`Failed to update patient medical record: ${errorText}`);
    }

    const responseData = await response.json();
    console.log("Backend response data:", responseData);
    return responseData;
};





export const deletePatientMedicalRecord = async (recordNumber: string): Promise<void> => {
    const url = `${API_URL}/${recordNumber}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete patient medical record: ${errorText}`);
    }
}

export const fetchPatientMedicalRecords = async (patientMedicalRecord: string): Promise<PatientMedicalRecordsDto> => {
    const url = `${API_URL}/getOne?recordNumber=${encodeURIComponent(patientMedicalRecord)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch patient medical record: ${await response.text()}`);
    }

    return await response.json();
};

export const downloadPatientMedicalRecord = async (recordNumber: string): Promise<void> => {
    const url = `${API_URL}/dowload/${recordNumber}`; // Backend endpoint for fetching the record

    try {
        console.debug('Requesting patient medical record download from URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
        });

        console.debug('Response received with status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Failed to download patient medical record: ${errorText}`);
        }

        // Parse JSON response to handle $values
        const responseData = await response.json();

        // Transform the response to remove `$id` and `$values`
        const transformedData = {
            ...responseData.data,
            allergies: responseData.data.allergies?.$values || [],
            medicalConditions: responseData.data.medicalConditions?.$values || [],
        };

        console.debug('Transformed data for download:', transformedData);

        // Create a Blob from the transformed JSON object
        const blob = new Blob([JSON.stringify(transformedData, null, 2)], {
            type: 'application/json',
        });

        const fileURL = window.URL.createObjectURL(blob); // Create a temporary URL for the Blob

        // Create a link for the file download
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = `${recordNumber}_patient_medical_record.json`; // Name of the file

        // Append the link to the DOM and trigger the download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(fileURL); // Revoke the temporary URL
    } catch (error) {
        console.error('An error occurred while downloading the patient medical record:', error);
        throw error;
    }
};

