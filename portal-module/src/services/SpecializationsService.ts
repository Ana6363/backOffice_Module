const API_URL = `http://localhost:5184/api/v1/specialization`;
console.log(API_URL);

// Helper function to add Authorization header with the token
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const fetchSpecializations = async (filter:
    {
        specializationId?: string;
        specializationDescription?: string;
    } = {}
) => {
    const queryParams = Object.entries(filter)
    .filter(([_, value]) => value !== null && value !== undefined && value !== "")
    .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
    }, {} as Record<string, string>);

    const query = new URLSearchParams(queryParams).toString();
    const url = `${API_URL}/filter${query ? `?${query}` : ''}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(), // Pass the token in the headers
    });

    if (!response.ok) throw new Error('Failed to fetch specializations data');

    const data = await response.json();

    console.log("Response data for specializations:", data);

    const formattedData = data.specializations?.$values.map((item: any) => ({
        ...item.specialization,
        specializationId: item.specializationId,
        specializationDescription: item.specializationDescription,
    })) || [];

    return formattedData;  // Return the specializations data
};

export const addSpecialization = async (specialization: {
    specializationName: string;
    specializationDescription: string;
}) => {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: getHeaders(), // Pass the token in the headers
        body: JSON.stringify(specialization),
    });

    if (!response.ok) throw new Error('Failed to add specialization');

    const data = await response.json();

    console.log("Response data for adding specialization:", data);

    return data;  // Return the added specialization data
};

export const updateSpecialization = async (specialization: {
    specializationId: string;
    specializationDescription: string;
}) => {
    const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: getHeaders(), // Pass the token in the headers
        body: JSON.stringify(specialization),
    });

    if (!response.ok) throw new Error('Failed to update specialization');

    const data = await response.json();

    console.log("Response data for updating specialization:", data);

    return data;  // Return the updated specialization data
};

export const deleteSpecialization = async (specializationId: string) => {
    const response = await fetch(`${API_URL}/delete`, {
        method: 'DELETE',
        headers: getHeaders(), // Pass the token in the headers
    });

    if (!response.ok) throw new Error('Failed to delete specialization');

    const data = await response.json();

    console.log("Response data for deleting specialization:", data);

    return data;  // Return the deleted specialization data
};
