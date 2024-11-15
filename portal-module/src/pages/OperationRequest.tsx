import React, { useState, useEffect, useCallback } from 'react';
import { fetchOperationRequest, updateOperationRequest, deleteOperationRequest } from '../services/OperationRequestService';

const OperationRequest: React.FC = () => {
    const [operationRequestData, setOperationRequestData] = useState({
        requestId: '',
        deadline: '',
        appointementDate: '',
        priority: '',
        recordNumber: '',
        staffId: '',
        status: '',
        operationTypeName: '',
    });
    const [requestId, setRequestId] = useState('');

    
    const loadOperationRequest = useCallback(async () => {
        try {
            const data = await fetchOperationRequest({});
            if (data && data.length > 0) {
                const firstRequest = data[0]; // Pega o primeiro item, se houver mais de uma requisição
                setOperationRequestData(firstRequest);
                setRequestId(firstRequest.requestId);
            } else {
                console.error('Dados de requisição de operação não encontrados:', data);
                // Redefine os dados caso não haja resposta
                setOperationRequestData({
                    requestId: '',
                    deadline: '',
                    appointementDate: '',
                    priority: '',
                    recordNumber: '',
                    staffId: '',
                    status: '',
                    operationTypeName: '',
               });
            }
        } catch (error) {
            console.error('Erro ao buscar a requisição de operação:', error);
        }
    }, []);

    useEffect(() => {
        loadOperationRequest();
    }, [loadOperationRequest]);


    const handleUpdateOperationRequest = async () => {
        if (!requestId) {
            alert("Request Id is required for updating your operation request.");
            return;
        }

        try {
            await updateOperationRequest(operationRequestData);
            alert('Operation request updated successfully');
        } catch (error) {
            console.error('Error updating operation request:', error);
            alert('Failed to update operation request');
        }
    }

    const handleDeleteOperationRequest = async () => {
        if (!requestId) {
            alert("Request Id is required for deleting your operation request.");
            return;
        }

        try {
            await deleteOperationRequest(requestId);
            alert('Operation request deleted successfully');
        } catch (error) {
            console.error('Error deleting operation request:', error);
            alert('Failed to delete operation request');
        }
    }

    return (
        <div>
            <h1>Operation Request</h1>
            <p>Request Id: {operationRequestData.requestId}</p>
            <p>Deadline: {operationRequestData.deadline}</p>
            <p>Appointement Date: {operationRequestData.appointementDate}</p>
            <p>Priority: {operationRequestData.priority}</p>
            <p>Record Number: {operationRequestData.recordNumber}</p>
            <p>Staff Id: {operationRequestData.staffId}</p>
            <p>Status: {operationRequestData.status}</p>
            <p>Operation Type Name: {operationRequestData.operationTypeName}</p>
            
            <div>   
                <h2>Update Operation Request</h2>
                <button onClick={handleUpdateOperationRequest}>Update</button>
            </div>
            <div>
                <h2>Delete Operation Request</h2>
                <button onClick={handleDeleteOperationRequest}>Delete</button>
            </div>


        </div>
    )

};
    
export default OperationRequest;