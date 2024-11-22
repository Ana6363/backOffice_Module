import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOperationTypes, deleteOperationType } from '../../../services/OpTypeService';  

import './DeleteOpType.css'; 

const DeleteOpType: React.FC = () => {
    const { operationTypeName } = useParams<{ operationTypeName: string }>(); 
    const [operationType, setOperationType] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Load Op Type through name
    useEffect(() => {
        const loadOperationType = async () => {
            try {
                const data = await fetchOperationTypes(); // Get all data

                // Find Op Type through name
                const selectedOpType = data.operationType.$values.find(
                    (opType: any) => opType.operationTypeName === operationTypeName
                );

                if (selectedOpType) {
                    setOperationType(selectedOpType);
                } else {
                    console.error('Operation type not found');
                    setOperationType(null);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching operation type:', error);
                setLoading(false);
                setOperationType(null);
            }
        };

        if (operationTypeName) {
            loadOperationType();
        }
    }, [operationTypeName]);

    // Function to delete Op Type 
    const handleDelete = async () => {
        if (operationType) {
            try {
                // Calls service to delete
                await deleteOperationType(operationType.operationTypeName);  
                alert(`Operation type ${operationType.operationTypeName} deleted successfully.`);
                navigate('/admin/opTypes');  // Redirects back to Op Type List after deleting
            } catch (error) {
                console.error('Error deleting operation type:', error);
                alert('Failed to delete operation type.');
            }
        }
    };

    const handleCancel = () => {
        navigate('/admin/opTypes');  // Redirects back to Op Type List without deleting
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!operationType) {
        return <p>Operation type not found!</p>;
    }

    return (
        <div>
            <h1>Confirm Deletion</h1>
            <p>Are you sure you want to delete the following operation type?</p>
            
            {/* Show OperationType data */}
            <table className="operation-type-details">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{operationType.operationTypeName}</td>
                    </tr>
                    <tr>
                        <td>Specialization</td>
                        <td>{operationType.specialization || 'No specialization'}</td>
                    </tr>
                    <tr>
                        <td>Preparation Time</td>
                        <td>{operationType.preparationTime} minutes</td>
                    </tr>
                    <tr>
                        <td>Surgery Time</td>
                        <td>{operationType.surgeryTime} minutes</td>
                    </tr>
                    <tr>
                        <td>Cleaning Time</td>
                        <td>{operationType.cleaningTime} minutes</td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                    Delete
                </button>
                <button onClick={handleCancel} style={{ backgroundColor: 'gray', color: 'white' }}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteOpType;
