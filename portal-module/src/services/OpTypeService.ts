const API_URL = `http://localhost:5184/api/operationType`;
console.log(API_URL);

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const fetchOperationTypes = async () => {
    const url = `${API_URL}/GetAllOperationTypes`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch operation types');

    const data = await response.json();

    console.log("Fetch Operation Types Response Data:", data);

    // Explicitly returning the full response data to be handled by the component
    return data;
};


export const createOperationType = async (opTypeData: {
    operationTypeName: string;
    operationTime: number;
    specializations: string[];
}) => {
    try {
        // Wrap opTypeData within `operationTypeDTO` and convert specializations to the correct format
        const formattedData = {
            operationTypeName: opTypeData.operationTypeName,
            operationTime: opTypeData.operationTime,
            specializations: opTypeData.specializations.map((name) => ({ name: name })), // Convert each specialization to { name: "Specialization" }
        };

        const response = await fetch(`${API_URL}/Create`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(formattedData),
        });

        console.log("Create Operation Type Response Status:", response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response Body:', errorText);
            throw new Error(`Failed to create Operation Type: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Create Operation Type Response Data:", data);

        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in createOperationType:", error.message);
        } else {
            console.error("Unexpected error in createOperationType:", error);
        }
        throw error;
    }
};


export const updateOperationType = async (opTypeData: {
    operationTypeId: string;
    operationTypeName: string;
    operationTime: number;
    specializations: string[];
}) => {
    try {
        // Convert specializations to the correct format
        const formattedData = {
            operationTypeId: opTypeData.operationTypeId,
            operationTypeName: opTypeData.operationTypeName,
            operationTime: opTypeData.operationTime,
            specializations: opTypeData.specializations.map((name) => ({ name: name })), // Convert each specialization to { name: "Specialization" }
        };

        const response = await fetch(`${API_URL}/Update`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(formattedData),
        });

        console.log("Update Operation Type Response Status:", response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response Body:', errorText);
            throw new Error(`Failed to update Operation Type: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Update Operation Type Response Data:", data);

        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in updateOperationType:", error.message);
        } else {
            console.error("Unexpected error in updateOperationType:", error);
        }
        throw error;
    }
};


export const deleteOperationType = async (operationTypeName: string) => {
    const url = `${API_URL}/${encodeURIComponent(operationTypeName)}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        console.log("Delete Operation Type Response Status:", response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response Body:', errorText);
            throw new Error('Failed to delete operation type');
        }

        return 0;
    } catch (error) {
        console.error("Error in deleteOperationType:", error);
        throw error;
    }
};


