import React, { useState, useEffect, useCallback } from 'react';
import { updateOperationRequest, fetchOperationRequest } from '../../services/OperationRequestService';
import Button from '../../components/Buttons/Buttons';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './CreateOperationRequest.css';

const UpdateOperationRequest: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the ID of the operation request from the URL

    const [requestData, setRequestData] = useState<any | null>(null);
    const [editData, setEditData] = useState<any>({
        deadLine: '',
        priority: '',
        recordNumber: '',
        status: '',
        operationTypeName: '',
    });

    

    // Function to load a specific operation request based on ID
    useEffect(() => {
        const fetchOperationRequestData = async () => {
        try {
                const operationRequestList = await fetchOperationRequest({ requestId: id || '' });

                if (operationRequestList.length === 1) {
                    const opRequest = operationRequestList[0];
                    setRequestData(opRequest);
                setEditData({
                        deadLine: opRequest.deadLine,
                        priority: opRequest.priority,
                        recordNumber: opRequest.recordNumber,
                        status: opRequest.status,
                        operationTypeName: opRequest.operationTypeName,
                });
            } else {
                    console.error("Operation Request not found");
                    alert("Operation Request not found");
                navigate('/operationRequest');
            }
        } catch (error) {
                console.error("Error fetching operation request data:", error);
                alert("Error fetching operation request data");
        }
    };
    if (id) {
            fetchOperationRequestData();
    }
    } , [id, navigate]);

        

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    };

    const handleUpdateOperationRequest = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload on form submit
        try {
            await updateOperationRequest(editData); // Call the API to update
            alert('Operation Request updated successfully!');
            navigate('/operationRequest'); // Redirect to the list of operation requests
        } catch (error) {
            alert('Failed to update Operation Request');
            console.error(error);
        }
    };

    // Navigation menu items
    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
    ];

    

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Update Operation Request</h1>


                    {requestData ? (
                        <form onSubmit={handleUpdateOperationRequest} className="request-form">
                            <div className="mb-4">
                                <label>DeadLine</label>
                                <input
                                type="datetime-local"
                                id="deadLine"
                                value={editData.deadLine}
                                onChange={handleInputChange}
                                placeholder="DeadLine"
                                />
                        </div>


                            <div className="mb-4">
                                <label htmlFor="status">Priority</label>
                                <select
                                name="priority"
                                id="priority"
                                value={editData.priority}
                                onChange={handleInputChange}
                                title='Priority'
                                >
                                    <option value="LOW">LOW</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HIGH">HIGH</option>
                                </select>
                        </div>

                            <div className="mb-4">
                                <label htmlFor="status">Status</label>
                                <select
                                    name="status"
                                    id="status"
                                    value={editData.status}
                                    onChange={handleInputChange}
                            
                                    >
                                    <option value="PENDING">PENDING</option>
                                    <option value="ACCEPTED">ACCEPTED</option>
                                    <option value="REJECTED">REJECTED</option>
                                </select>
                            </div>
                            
                        <div className="mb-4">
                                <label>Operation Type</label>
                                <input
                                type="text"
                                id="operationTypeName"
                                value={editData.operationTypeName}
                                onChange={handleInputChange}
                                placeholder="Operation Type"
                                />
                        </div>
       
                    
                                <Button onClick={handleUpdateOperationRequest} className="button button-primary">
                                    Update Operation Request
                                </Button>
                            
                        </form>
                    ) : (
                    <p>Loading Operation Request data...</p>
                    )}
                    
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UpdateOperationRequest;
