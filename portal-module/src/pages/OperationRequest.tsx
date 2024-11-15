import React, { useState, useEffect, useCallback } from 'react';
import { fetchOperationRequest, createOperationRequest, updateOperationRequest, deleteOperationRequest } from '../services/OperationRequestService';

const OperationRequest: React.FC = () => {
    const [operationRequests, setOperationRequests] = useState<any[]>([]);
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});
    const [newRequestData, setNewRequestData] = useState<any>({
        deadline: '',
        priority: '',
        recordNumber: '',
        status: 'PENDING',
        operationTypeName: '',
    });

    const userEmail = localStorage.getItem('userEmail');
    const staffId = userEmail ? userEmail.split('@')[0] : '';

    const loadOperationRequest = useCallback(async () => {
        try {
            const data = await fetchOperationRequest({});
            if (data && data.length > 0) {
                setOperationRequests(data);
            } else {
                console.error('No operation request data found:', data);
                setOperationRequests([]);
            }
        } catch (error) {
            console.error('Error fetching operation requests:', error);
        }
    }, []);

    useEffect(() => {
        loadOperationRequest();
    }, [loadOperationRequest]);

    const handleEditClick = (request: any) => {
        setSelectedRequestId(request.requestId);
        setEditData({ ...request });
    };

    const handleInputChange = (field: string, value: string, isEdit = false) => {
        if (isEdit) {
            setEditData((prevData: any) => {
                const newData = { ...prevData, [field]: value };
                if (field === 'status' && value === 'ACCEPTED' && !prevData.appointementDate) {
                    newData.appointementDate = '';
                }
                return newData;
            });
        } else {
            setNewRequestData((prevData: any) => ({ ...prevData, [field]: value }));
        }
    };

    const handleUpdateOperationRequest = async () => {
        if (editData.status === 'ACCEPTED' && !editData.appointementDate) {
            alert('Appointement Date is required when status is ACCEPTED.');
            return;
        }

        const formattedData = { ...editData, operationTypeName: editData.operationType };
        delete formattedData.operationType;

        try {
            await updateOperationRequest(formattedData);
            alert('Operation request updated successfully');
            loadOperationRequest();
            setSelectedRequestId(null);
        } catch (error) {
            console.error('Error updating operation request:', error);
            alert('Failed to update operation request');
        }
    };

    const handleDeleteOperationRequest = async (requestId: string) => {
        try {
            const result = await deleteOperationRequest(requestId);
            if (result.success) {
                alert('Operation request deleted successfully');
            }
            loadOperationRequest();
        } catch (error) {
            console.error('Error deleting operation request:', error);
            alert('Failed to delete operation request');
        }
    };

    const handleCreateOperationRequest = async () => {
        const requestData = {
            ...newRequestData,
            staffId,
        };

        try {
            await createOperationRequest(requestData);
            alert('Operation request created successfully');
            loadOperationRequest();
            setNewRequestData({
                deadline: '',
                priority: '',
                recordNumber: '',
                status: 'PENDING',
                operationTypeName: '',
            });
        } catch (error) {
            console.error('Error creating operation request:', error);
            alert('Failed to create operation request');
        }
    };

    return (
        <div>
            <h1>Operation Requests</h1>

            {/* Create Operation Request Form */}
            <div>
                <h2>Create New Operation Request</h2>
                <input
                    type="datetime-local"
                    placeholder="Deadline"
                    value={newRequestData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Priority"
                    value={newRequestData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Record Number"
                    value={newRequestData.recordNumber}
                    onChange={(e) => handleInputChange('recordNumber', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Operation Type Name"
                    value={newRequestData.operationTypeName}
                    onChange={(e) => handleInputChange('operationTypeName', e.target.value)}
                />
                <button onClick={handleCreateOperationRequest}>Create Operation Request</button>
            </div>

            {operationRequests.length === 0 ? (
                <p>No operation requests found for this staff member.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Request Id</th>
                            <th>Deadline</th>
                            <th>Priority</th>
                            <th>Record Number</th>
                            <th>Staff Id</th>
                            <th>Status</th>
                            <th>Operation Type</th>
                            <th>Appointement Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operationRequests.map((request) => (
                            <tr key={request.requestId}>
                                <td>{request.requestId}</td>
                                <td>{new Date(request.deadLine).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}</td>
                                <td>
                                    {selectedRequestId === request.requestId ? (
                                        <input
                                            type="text"
                                            value={editData.priority}
                                            onChange={(e) => handleInputChange('priority', e.target.value, true)}
                                        />
                                    ) : (
                                        request.priority
                                    )}
                                </td>
                                <td>{request.recordNumber}</td>
                                <td>{request.staffId}</td>
                                <td>
                                    {selectedRequestId === request.requestId ? (
                                        <select
                                            value={editData.status}
                                            onChange={(e) => handleInputChange('status', e.target.value, true)}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="ACCEPTED">ACCEPTED</option>
                                            <option value="REJECTED">REJECTED</option>
                                        </select>
                                    ) : (
                                        request.status
                                    )}
                                </td>
                                <td>
                                    {selectedRequestId === request.requestId ? (
                                        <input
                                            type="text"
                                            value={editData.operationType}
                                            onChange={(e) => handleInputChange('operationType', e.target.value, true)}
                                        />
                                    ) : (
                                        request.operationType
                                    )}
                                </td>
                                <td>
                                    {selectedRequestId === request.requestId && editData.status === 'ACCEPTED' ? (
                                        <input
                                            type="datetime-local"
                                            value={editData.appointementDate}
                                            onChange={(e) => handleInputChange('appointementDate', e.target.value, true)}
                                        />
                                    ) : (
                                        request.appointementDate
                                            ? new Date(request.appointementDate).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                                  second: '2-digit',
                                              })
                                            : 'N/A'
                                    )}
                                </td>
                                <td>
                                    {selectedRequestId === request.requestId ? (
                                        <>
                                            <button onClick={handleUpdateOperationRequest}>Save</button>
                                            <button onClick={() => setSelectedRequestId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(request)}>Edit</button>
                                            <button onClick={() => handleDeleteOperationRequest(request.requestId)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OperationRequest;
