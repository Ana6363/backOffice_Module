const API_URL = `http://localhost:5184/api/v1/operationRequest`;
console.log(API_URL);

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});


export const fetchOperationRequest = async (filter: {
    requestId?: string;
    deadline?: string;
    appointementDate?: string;
    priority?: string;
    recordNumber?: string;
    staffId?: string;
    status?: string;
    operationTypeName?: string;
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

    if (!response.ok) throw new Error('Failed to fetch operationRequest');

    const data = await response.json();
    
    const operationRequests = data.operationRequests?.$values || [];

    if (!Array.isArray(operationRequests)) {
        throw new Error(`Expected operationRequests.$values to be an array, received: ${typeof operationRequests}`);
    }

    return operationRequests;

};

export const createOperationRequest = async (operationRequestData: {
    requestId: string;
    deadline: string;
    appointementDate: string;
    priority: string;
    recordNumber: string;
    staffId: string;
    status: string;
    operationTypeName: string;
}) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(operationRequestData),
    });

    if (!response.ok) throw new Error('Failed to create operationRequest');

    const data = await response.json();

    return data;

};

export const updateOperationRequest = async (operationRequestData: {
    requestId: string;
    deadline: string;
    appointementDate: string;
    priority: string;
    recordNumber: string;
    staffId: string;
    status: string;
    operationTypeName: string;
}) => {
    const response = await fetch(`${API_URL}/${operationRequestData.requestId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(operationRequestData),
    });

    if (!response.ok) throw new Error('Failed to update operationRequest');

    const data = await response.json();

    return data;
};

export const deleteOperationRequest = async (requestId: string) => {
    const response = await fetch(`${API_URL}/${requestId}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    if (!response.ok) throw new Error('Failed to delete operationRequest');

    return await response.json();
}

