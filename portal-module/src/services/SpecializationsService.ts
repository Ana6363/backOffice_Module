const API_URL = `https://api-dotnet.hospitalz.site/api/v1/specialization`;
console.log(API_URL);

// Helper function to add Authorization header with the token
const getHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authorization token is missing');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const fetchSpecializations = async (filter: { Name?: string; Description?: string } = {}) => {
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
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch specializations data');
    }

    const data = await response.json();

    console.log("API Response for specializations:", data);

    // Ajuste no mapeamento para corresponder à resposta da API
    const formattedData =
        data.specializations?.$values?.map((item: any) => ({
            Name: item.id, // `id` da API corresponde a `Name`
            Description: item.description, // `description` da API corresponde a `Description`
        })) || [];

    console.log("Formatted specialization data:", formattedData);

    return formattedData;
};



export const addSpecialization = async (specialization: {
    Name: string;
    Description: string;
}) => {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            Name: specialization.Name,
            Description: specialization.Description,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to add specialization: ${error}`);
    }

    const data = await response.json();

    console.log("Response data for adding specialization:", data);

    return {
        Name: data.specialization.Name,
        Description: data.specialization.Description,
    };
};

export const updateSpecialization = async (specialization: {
    Name: string;
    Description: string;
}) => {
    const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
            Name: specialization.Name,
            Description: specialization.Description,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to update specialization: ${error}`);
    }

    const data = await response.json();

    console.log("Response data for updating specialization:", data);

    return {
        Name: data.specialization.Name,
        Description: data.specialization.Description,
    };
};

export const deleteSpecialization = async (specialization: {
    Name: string;
    Description: string;
}) => {
    const response = await fetch(`${API_URL}/delete`, {
        method: 'DELETE',
        headers: getHeaders(),
        body: JSON.stringify({
            Name: specialization.Name,
            Description: specialization.Description,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to delete specialization: ${error}`);
    }

    const data = await response.json();

    console.log("Response data for deleting specialization:", data);

    return data; // Return the deleted specialization data
};
