import { AllergyCreateDto, AllergyDto } from '../dtos/AllergyDto';

const API_URL = `https://api-node.hospitalz.site/api/allergies`;

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const createAllergy = async (allergyData: AllergyCreateDto): Promise<AllergyDto> => {
    const url = `${API_URL}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(allergyData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create allergy: ${errorText}`);
    }

    return await response.json();
};

export const fetchAllAllergies = async (): Promise<AllergyDto[]> => {
    const url = `${API_URL}`;

    try {
        console.debug('Fetching allergies from URL:', url);
        console.debug('Headers being sent:', getHeaders());

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
        });

        console.debug('Response received with status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Failed to fetch allergies: ${errorText}`);
        }

        const responseData = await response.json();
        console.debug('Parsed response data:', responseData);

        // Return the correct array of allergies
        return responseData.data || [];
    } catch (error) {
        console.error('An error occurred while fetching allergies:', error);
        throw error;
    }
};


