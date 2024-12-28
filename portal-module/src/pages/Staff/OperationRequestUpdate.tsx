import React, { useState, useEffect } from 'react';
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
        requestId: '', // Ensure requestId is part of the state
        deadLine: '',
        priority: '',
        recordNumber: '',
        status: '',
        operationTypeName: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    // Function to load a specific operation request based on ID
    useEffect(() => {
        const fetchOperationRequestData = async () => {
            console.log('Initiating fetch operation request data...');

            try {
                const operationRequestList = await fetchOperationRequest({});
                console.log('Fetched operation requests:', operationRequestList);

                if (!operationRequestList || operationRequestList.length === 0) {
                    console.warn('No operation requests found!');
                }

                const opRequest = operationRequestList.find((request: any) => request.requestId === id);
                console.log('Selected operation request:', opRequest);

                if (opRequest) {
                    console.log('Setting request data for the selected operation request.');
                    setRequestData(opRequest);
                    setEditData({
                        requestId: opRequest.requestId || '', // Set requestId here
                        deadLine: opRequest.deadLine || '',
                        priority: opRequest.priority || '',
                        recordNumber: opRequest.recordNumber || '',
                        status: opRequest.status || '',
                        operationTypeName: opRequest.operationTypeName || '',
                    });
                } else {
                    console.error(`Operation Request with ID ${id} not found.`);
                    alert(`Operation Request with ID ${id} not found. Redirecting to list.`);
                    navigate('/operationRequest');
                }
            } catch (error) {
                console.error('Error during fetchOperationRequestData:', error);
                alert('An error occurred while fetching operation request data.');
            } finally {
                console.log('Fetch operation request complete. Setting loading state to false.');
                setIsLoading(false);
            }
        };

        if (id) {
            console.log('Received ID from URL params:', id);
            fetchOperationRequestData();
        } else {
            console.warn('No ID received in URL params. Redirecting...');
            navigate('/operationRequest');
        }
    }, [id, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(`Handling input change. Field: ${name}, Value: ${value}`);
        setEditData({
            ...editData,
            [name]: value,
        });
    };

    const handleUpdateOperationRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting update for operation request:', editData);

        try {
            if (!editData.requestId) {
                throw new Error('Request ID is required for updating the operation request.');
            }

            const response = await updateOperationRequest(editData);
            console.log('Operation Request update response:', response);

            alert('Operation Request updated successfully!');
            navigate('/operationRequest');
        } catch (error) {
            console.error('Failed to update Operation Request:', error);
        }
    };

    // Navigation menu items
    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
        { id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel' },
        { id: 3, name: 'Manage Appointments', route: '/appointments' },
        { id: 4, name: 'Search Allergies', route: '/allergies' },
        { id: 5, name: 'Search Medical Conditions', route: '/medicalConditions' },
        { id: 6, name: 'Manage Patient Medical Record', route: '/patientMedicalRecord' }
      ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Update Operation Request</h1>

                    {isLoading ? (
                        // Show loading message while data is being fetched
                        <p>Loading Operation Request data...</p>
                    ) : requestData ? (
                        <form onSubmit={handleUpdateOperationRequest} className="request-form">
                            <div className="mb-4">
                                <label>Deadline</label>
                                <input
                                    type="datetime-local"
                                    name="deadLine"
                                    id="deadLine"
                                    value={editData.deadLine}
                                    onChange={handleInputChange}
                                    placeholder="Deadline"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    name="priority"
                                    id="priority"
                                    value={editData.priority}
                                    onChange={handleInputChange}
                                    title="Priority"
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
                                    name="operationTypeName"
                                    id="operationTypeName"
                                    value={editData.operationTypeName}
                                    onChange={handleInputChange}
                                    placeholder="Operation Type"
                                />
                            </div>

                            <Button type="submit" className="button button-primary">
                                Update Operation Request
                            </Button>
                        </form>
                    ) : (
                        <p>Operation Request not found.</p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UpdateOperationRequest;
