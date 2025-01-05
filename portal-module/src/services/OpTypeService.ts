const API_URL = `https://api-dotnet.hospitalz.site/api/v1/operationType`;
console.log(API_URL);

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const fetchOperationTypes = async () => {
    const url = `${API_URL}/getAllOperationTypes`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch operation types');

    const data = await response.json();

    console.log("Fetch Operation Types Response Data:", data);


    return data;
};


export const createOperationType = async (opTypeData: {
    operationTypeName: string;
    preparationTime: number;
    surgeryTime: number;
    cleaningTime: number;
    specializations: { name: string; neededPersonnel: number }[];
}) => {
    try {
        const formattedData = {
            operationTypeId: "", 
            operationTypeName: opTypeData.operationTypeName,
            preparationTime: opTypeData.preparationTime,
            surgeryTime: opTypeData.surgeryTime,
            cleaningTime: opTypeData.cleaningTime,
            specializations: opTypeData.specializations.map((specialization) => ({
                name: specialization.name,
                neededPersonnel: specialization.neededPersonnel,
            })),
        };

        const response = await fetch(`${API_URL}/create`, {
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
    preparationTime: number;
    surgeryTime: number;
    cleaningTime: number;
    specializations: { name: string; neededPersonnel: number }[];
}) => {
    try {
        // Wrap opTypeData within the required format
        const formattedData = {
            operationTypeId: opTypeData.operationTypeId,
            operationTypeName: opTypeData.operationTypeName,
            preparationTime: opTypeData.preparationTime,
            surgeryTime: opTypeData.surgeryTime,
            cleaningTime: opTypeData.cleaningTime,
            specializations: opTypeData.specializations.map((specialization) => ({
                name: specialization.name,
                neededPersonnel: specialization.neededPersonnel,
            })),
        };

        const response = await fetch(`${API_URL}/update`, {
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


