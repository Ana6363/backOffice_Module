const API_URL = `https://api-dotnet.hospitalz.site/api/v1/patient`;
console.log(API_URL);

// Helper function to add Authorization header with the token
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const fetchLoggedInPatient = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const url = `${API_URL}/loggedPatient`;  // Filter by the logged-in user's ID

    console.log("Fetching logged-in patient's data with token:", token);

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(), // Pass the token in the headers
    });

    if (!response.ok) throw new Error('Failed to fetch logged-in patient data');

    const data = await response.json();

    console.log("Response data for logged-in patient:", data);

    const formattedData = data.patients?.$values.map((item: any) => ({
        ...item.patient,
        phoneNumber: item.phoneNumber,
        userId: item.userId,
        isToBeDeleted: item.isToBeDeleted,
        firstName : item.firstName,
        lastName : item.lastName,
        fullName : item.fullName
    })) || [];

    return formattedData[0];  // Return the specific patient's data
};

export const fetchPatient = async (filter: {
    userId?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    isToBeDeleted?: string;
}) => {
    const queryParams = Object.entries(filter)
        .filter(([_, value]) => value !== null && value !== undefined && value !== "")
        .reduce((acc, [key, value]) => {
            acc[key] = value.toString();
            return acc;
        }, {} as Record<string, string>);

    const query = new URLSearchParams(queryParams).toString();
    const url = `${API_URL}/filter${query ? `?${query}` : ''}`;

    console.log("Fetching patients with URL:", url);

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch Patient');

    const data = await response.json();
    
    console.log("Response data received from API:", data);

    const formattedData = data.patients?.$values.map((item: any) => ({
        ...item.patient,
        phoneNumber: item.phoneNumber,
        userId: item.userId,
        isToBeDeleted: item.isToBeDeleted,
    })) || [];

    console.log("Formatted patient data for frontend:", formattedData);

    return formattedData;
};

export const createPatient = async (patientData: {
    dateOfBirth: string;
    phoneNumber: number;
    emergencyContact: number;
    gender: string;
    userId: string;
    firstName: string;
    lastName: string;
    fullName: string;
}) => {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(patientData),
    });
    if (!response.ok) throw new Error('Failed to create Patient');
    return await response.json();
};

export const updatePatient = async (patientData: {
    recordNumber: string;
    dateOfBirth: string;
    phoneNumber: number;
    emergencyContact: number;
    gender: string;
    userId: string;
    firstName: string;
    lastName: string;
    fullName: string;
}) => {
    const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(patientData),
    });
    if (!response.ok) throw new Error('Failed to update Patient');
    return await response.json();
};

export const markForDeletePatient = async (recordNumber: string) => {
    const response = await fetch(`${API_URL}/markToDelete`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ recordNumber }),
    });
    if (!response.ok) throw new Error('Failed to mark for deletion of the patient');
    return await response.json();
};

export const deletePatient = async (recordNumber: string) => {
    const response = await fetch(`${API_URL}/delete/${recordNumber}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete Patient');
    return await response.json();
};

