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
    const [editData, setEditData] = useState<any>({
        requestId: '',
        deadline: '',
        priority: '',
        recordNumber: '',
        status: '',
        operationTypeName: '',
        appointementDate: '',  // Make sure to include the date if required by your API
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Function to load a specific operation request based on ID
    const loadOperationRequest = useCallback(async () => {
        if (!id) return;
        try {
            const data = await fetchOperationRequest({ requestId: id });
            if (data && data.length > 0) {
                setEditData(data[0]); // Assuming the data is an array and we take the first item
            } else {
                alert('Operation Request not found');
                navigate('/operationRequest'); // Redirect to the operation requests list if not found
            }
        } catch (error) {
            console.error('Failed to load operation request:', error);
            alert('Failed to load operation request');
            navigate('/operationRequest');
        } finally {
            setIsLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        loadOperationRequest(); // Load the specific operation request when component mounts
    }, [loadOperationRequest]);

    const handleInputChange = (field: string, value: string) => {
        setEditData((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUpdateOperationRequest = async () => {
        if (!id) return;
        setIsSaving(true); // Indicate saving process
        try {
            // Prepare the data for update request
            const updatedData = { ...editData, requestId: id };
            await updateOperationRequest(updatedData); // Call the API to update
            alert('Operation Request updated successfully!');
            navigate('/operationRequest'); // Redirect to the list of operation requests
        } catch (error) {
            alert('Failed to update Operation Request');
            console.error(error);
        } finally {
            setIsSaving(false); // End the saving process
        }
    };

    // Navigation menu items
    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/staff' },
    ];

    if (isLoading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Update Operation Request</h1>

                    <div className="mb-4">
                        <label>Record Number</label>
                        <input
                            type="text"
                            value={editData.recordNumber}
                            onChange={(e) => handleInputChange('recordNumber', e.target.value)}
                            placeholder="Record Number"
                            disabled
                        />
                    </div>

                    <div className="mb-4">
                        <label>Priority</label>
                        <input
                            type="text"
                            value={editData.priority}
                            onChange={(e) => handleInputChange('priority', e.target.value)}
                            placeholder="Priority"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={editData.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
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
                            value={editData.operationTypeName}
                            onChange={(e) => handleInputChange('operationTypeName', e.target.value)}
                            placeholder="Operation Type"
                        />
                    </div>

                    <div className="mb-4">
                        <Button onClick={handleUpdateOperationRequest} disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UpdateOperationRequest;
