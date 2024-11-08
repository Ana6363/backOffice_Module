const API_URL = `http://localhost:5184/api/v1/staff`;
console.log(API_URL);

// Helper function to add Authorization header with the token
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const fetchStaff = async (filter: {
    staffId?: string;
    phoneNumber?: number;
    specialization?: string;
    status?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
}) => {
    const queryParams = Object.entries(filter)
        .filter(([_, value]) => value !== null && value !== undefined)
        .reduce((acc, [key, value]) => {
            acc[key] = value as string;
            return acc;
        }, {} as Record<string, string>);

    const query = new URLSearchParams(queryParams).toString();
    const url = `${API_URL}/filter${query ? `?${query}` : ''}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    if (!response.ok) throw new Error('Failed to fetch staff');

    const data = await response.json();
    
    const staffMembers = data.staffMembers?.$values || [];

    if (!Array.isArray(staffMembers)) {
        throw new Error(`Expected staffMembers.$values to be an array, received: ${typeof staffMembers}`);
    }

    return staffMembers;
};

export const createStaff = async (staffData: {
    staffId: string;
    licenseNumber: string;
    specialization: string;
    phoneNumber: number;
    availableSlots: { startTime: string; endTime: string }[];
    status: boolean;
    firstName: string;
    lastName: string;
    fullName: string;
}) => {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(staffData),
    });
    if (!response.ok) throw new Error('Failed to create staff');
    return await response.json();
};

export const updateStaff = async (staffData: {
    staffId: string;
    licenseNumber: string;
    specialization: string;
    phoneNumber: number;
    availableSlots: { startTime: string; endTime: string }[];
    status: boolean;
    firstName: string;
    lastName: string;
    fullName: string;
}) => {
    const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(staffData),
    });
    if (!response.ok) throw new Error('Failed to update staff');
    return await response.json();
};

export const deactivateStaff = async (staffId: string) => {
    const response = await fetch(`${API_URL}/deactivate`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ staffId }),
    });
    if (!response.ok) throw new Error('Failed to deactivate staff');
    return await response.json();
};
