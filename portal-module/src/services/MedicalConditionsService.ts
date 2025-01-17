import { MedicalConditionsDto, MedicalConditionsCreateDto } from "../dtos/MedicalConditionsDto";

const API_URL = `https://api-dotnet.hospitalz.site/api/v1/medical-conditions`;

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const createMedicalConditions = async (medicalConditionsData: MedicalConditionsCreateDto): Promise<MedicalConditionsDto> => {
    const url = `${API_URL}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(medicalConditionsData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create medical conditions: ${errorText}`);
    }

    return await response.json();
};

export const fetchAllMedicalConditions = async (): Promise<MedicalConditionsDto[]> => {
    const url = `${API_URL}`;

    try {
        console.debug('Fetching medical conditions from URL:', url);
        console.debug('Headers being sent:', getHeaders());

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
        });

        console.debug('Response received with status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Failed to fetch medical conditions: ${errorText}`);
        }

        const responseData = await response.json();
        console.debug('Parsed response data:', responseData);

        return responseData.data?.$values || [];
    } catch (error) {
        console.error('An error occurred while fetching medical conditions:', error);
        throw error;
    }
};

export const updateMedicalConditions = async (medicalConditionsData: MedicalConditionsDto): Promise<MedicalConditionsDto> => {
    const url = `${API_URL}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(medicalConditionsData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update medical conditions: ${errorText}`);
    }

    return await response.json();
};

export const deleteMedicalConditions = async (medicalConditionsId: string): Promise<void> => {
    const url = `${API_URL}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete medical conditions: ${errorText}`);
    }
};

export const fetchMedicalCondition = async (medicalConditionName: string): Promise<MedicalConditionsDto> => {
    const url = `${API_URL}/getOne?name=${encodeURIComponent(medicalConditionName)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch medical condition: ${await response.text()}`);
    }

    return await response.json();
};