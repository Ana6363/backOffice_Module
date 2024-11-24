const API_URL = `http://localhost:5184/api/v1/operationRequest`;
console.log(API_URL);

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

const getStaffIdFromEmail = () => {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail ? userEmail.split('@')[0] : '';
};

export const fetchOperationRequest = async (filter: {
    requestId?: string;
    deadLine?: string;
    priority?: string;
    recordNumber?: string;
    status?: string;
    operationTypeName?: string;
}) => {
    const staffId = getStaffIdFromEmail();
    console.log(staffId);

    const filterWithStaffId = { ...filter, staffId };

    const queryParams = Object.entries(filterWithStaffId)
        .filter(([_, value]) => value !== null && value !== undefined)
        .reduce((acc, [key, value]) => {
            acc[key] = value as string;
            return acc;
        }, {} as Record<string, string>);

    const query = new URLSearchParams(queryParams).toString();
    const url = `${API_URL}/filter${query ? `?${query}` : ''}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch operationRequest');

    const data = await response.json();
    console.log(data);

    const operationRequests = data.operationRequests?.$values || [];

    if (!Array.isArray(operationRequests)) {
        throw new Error(`Expected operationRequests.$values to be an array, received: ${typeof operationRequests}`);
    }

    // Fetch userId for each recordNumber
    const updatedRequests = await Promise.all(
        operationRequests.map(async (request) => {
            const recordNumber = request.recordNumber;

            // Skip if recordNumber is missing
            if (!recordNumber) return request;

            try {
                const patientResponse = await fetch(
                    `http://localhost:5184/api/v1/patient/filter?recordNumber=${recordNumber}`,
                    { method: 'GET', headers: getHeaders() }
                );

                if (!patientResponse.ok) throw new Error(`Failed to fetch patient for recordNumber: ${recordNumber}`);

                const patientData = await patientResponse.json();
                const userId =
                    patientData?.patients?.$values?.[0]?.patient?.userId || 'Unknown User';

                // Replace recordNumber with userId
                return { ...request, userId };
            } catch (error) {
                console.error(`Error fetching patient for recordNumber: ${recordNumber}`, error);
                return { ...request, userId: 'Error Fetching User' };
            }
        })
    );

    return updatedRequests;
};


export const createOperationRequest = async (operationRequestData: {
    deadline: string;
    priority: string;
    userId: string;
    operationTypeName: string;
}) => {
    const staffId = getStaffIdFromEmail();

    const patientResponse = await fetch(
        `http://localhost:5184/api/v1/patient/filter?userId=${operationRequestData.userId}`,
        {
            method: 'GET',
            headers: getHeaders(),
        }
    );

    if (!patientResponse.ok) {
        const errorText = await patientResponse.text();
        console.error('Error fetching patient data:', errorText);
        throw new Error('Failed to fetch patient data.');
    }

    const patientData = await patientResponse.json();
    const recordNumber = patientData?.patients?.$values?.[0]?.patient?.recordNumber;

    if (!recordNumber) {
        throw new Error('No record number found for the provided email.');
    }

    // Replace `userId` with `recordNumber` in the request data
    const requestDataWithStaffId = {
        ...operationRequestData,
        recordNumber, // Use the fetched `recordNumber`
        staffId,
    };

    console.log('Final Request Data:', requestDataWithStaffId);

    const url = `${API_URL}/create`;

    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(requestDataWithStaffId),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error Response Body:', errorText);
        throw new Error('Failed to create operationRequest');
    }

    const data = await response.json();

    return data;
};

export const updateOperationRequest = async (operationRequestData: {
    requestId: string;
    deadLine: string;
    priority: string;
    recordNumber: string;
    staffId: string;
    status: string;
    operationTypeName: string;
}) => {
    const staffId = getStaffIdFromEmail();
    const requestDataWithStaffId = { ...operationRequestData, staffId };

    const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(requestDataWithStaffId),
    });

    if (!response.ok) throw new Error('Failed to update operationRequest');

    const data = await response.json();

    return data;
};

export const deleteOperationRequest = async (requestId: string) => {
    const response = await fetch(`${API_URL}/delete`, {
        method: 'DELETE',
        headers: getHeaders(),
        body: JSON.stringify({ requestId: requestId }),
    });

    if (!response.ok) throw new Error('Failed to delete operation request');

    return response.status === 204 ? { success: true } : await response.json();
};

