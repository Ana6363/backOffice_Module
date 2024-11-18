import React, { useState, useEffect, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { fetchOperationRequest, createOperationRequest, updateOperationRequest, deleteOperationRequest } from '../../services/OperationRequestService';
import './StafffPage.css';
import Button from '../../components/Buttons/Buttons'; 
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const OperationRequest: React.FC = () => {
    const [operationRequests, setOperationRequests] = useState<any[]>([]);
    const [editData, setEditData] = useState<any>(null);
    const [newRequestData, setNewRequestData] = useState({
        deadline: '',
        priority: '',
        recordNumber: '',
        status: 'PENDING',
        operationTypeName: '',
    });

    const loadOperationRequests = useCallback(async () => {
        try {
            const data = await fetchOperationRequest({});
            setOperationRequests(data);
        } catch (error) {
            console.error('Failed to load operation requests:', error);
        }
    }, []);

    useEffect(() => {
        loadOperationRequests();
    }, [loadOperationRequests]);

    const handleInputChange = (field: string, value: string, isEdit = false) => {
        if (isEdit) {
            setEditData((prev: any) => ({ ...prev, [field]: value }));
        } else {
            setNewRequestData((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleCreate = async () => {
        try {
            await createOperationRequest(newRequestData);
            alert('Operation Request created successfully!');
            setNewRequestData({ deadline: '', priority: '', recordNumber: '', status: 'PENDING', operationTypeName: '' });
            loadOperationRequests();
        } catch (error) {
            alert('Failed to create Operation Request.');
        }
    };

    const handleUpdate = async () => {
        try {
            await updateOperationRequest(editData);
            alert('Operation Request updated successfully!');
            setEditData(null);
            loadOperationRequests();
        } catch (error) {
            alert('Failed to update Operation Request.');
        }
    };

    const handleDelete = async (requestId: string) => {
        try {
            await deleteOperationRequest(requestId);
            alert('Operation Request deleted successfully!');
            loadOperationRequests();
        } catch (error) {
            alert('Failed to delete Operation Request.');
        }
    };
    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/staff/update' },
        
    ];

    return (
        <div className="app-wrapper"> {/* Ensure full-page layout */}
            <Navbar menuItemsProp={menuItems} />
            <div className="form">
                <h2>Create New Request</h2>
                <input
                    type="datetime-local"
                    value={newRequestData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    placeholder="Deadline"
                />
                <input
                    type="text"
                    value={newRequestData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    placeholder="Priority"
                />
                <input
                    type="text"
                    value={newRequestData.recordNumber}
                    onChange={(e) => handleInputChange('recordNumber', e.target.value)}
                    placeholder="Record Number"
                />
                <input
                    type="text"
                    value={newRequestData.operationTypeName}
                    onChange={(e) => handleInputChange('operationTypeName', e.target.value)}
                    placeholder="Operation Type"
                />
                <button onClick={handleCreate}>Create</button>
            </div>

            <table className="operation-table">
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Deadline</th>
                        <th>Priority</th>
                        <th>Record Number</th>
                        <th>Status</th>
                        <th>Operation Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {operationRequests.map((request) => (
                        <tr key={request.requestId}>
                            <td>{request.requestId}</td>
                            <td>{new Date(request.deadLine).toLocaleString()}</td>
                            <td>
                                {editData?.requestId === request.requestId ? (
                                    <input
                                        type="text"
                                        value={editData.priority}
                                        onChange={(e) => handleInputChange('priority', e.target.value, true)}
                                        placeholder="Priority"
                                    />
                                ) : (
                                    request.priority
                                )}
                            </td>
                            <td>{request.recordNumber}</td>
                            <td>
                                {editData?.requestId === request.requestId ? (
                                    <select
                                        value={editData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value, true)}
                                        title = "Status"
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="ACCEPTED">ACCEPTED</option>
                                        <option value="REJECTED">REJECTED</option>
                                    </select>
                                ) : (
                                    request.status
                                )}
                            </td>
                            <td>{request.operationType}</td>
                            <td>
                                {editData?.requestId === request.requestId ? (
                                    <>
                                        <button onClick={handleUpdate}>Save</button>
                                        <button onClick={() => setEditData(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setEditData(request)}>Edit</button>
                                        <button onClick={() => handleDelete(request.requestId)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OperationRequest;
