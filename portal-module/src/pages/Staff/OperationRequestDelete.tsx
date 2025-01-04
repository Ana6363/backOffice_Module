import React, { useState, useEffect, useCallback } from 'react';
import { deleteOperationRequest, fetchOperationRequest } from '../../services/OperationRequestService';
import './StaffPage.css';
import Button from '../../components/Buttons/Buttons';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/PopUp'; // Import Modal component
import Footer from '../../components/Footer/Footer';

const DeleteOperationRequest: React.FC = () => {
    const [operationRequests, setOperationRequests] = useState<any[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);  // Store the selected operation request for deletion
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    // Load all operation requests
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

    // Handle delete request
    const handleDeleteOperationRequest = async () => {
        if (!selectedRequest) {
            alert('No request selected for deletion.');
            return;
        }
        try {
            await deleteOperationRequest(selectedRequest.requestId);
            alert('Operation Request deleted successfully!');
            loadOperationRequests(); // Reload operation requests after deletion
            setModalOpen(false); // Close the modal after deletion
        } catch (error) {
            alert('Failed to delete Operation Request.');
        }
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
        { id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel' },
        { id: 3, name: 'Manage Appointments', route: '/appointments' },
        { id: 4, name: 'Search Allergies', route: '/allergies' },
        { id: 5, name: 'Search Medical Conditions', route: '/medicalConditions' },
        { id: 6, name: 'Manage Patient Medical Record', route: '/patientMedicalRecord' }
      ];
    // Select an operation request to delete
    const handleSelectRequestForDeletion = (request: any) => {
        setSelectedRequest(request);  // Set the selected request for deletion
        setModalOpen(true);  // Open the confirmation modal
    };

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Operation Requests</h1>
                    <p>Select an operation request to delete.</p>

                    {/* List of Operation Requests */}
                    <div className="operation-requests-list">
                        {operationRequests.map((request: any) => (
                            <div key={request.requestId} className="operation-request-item">
                                <span>{request.recordNumber}</span>
                                <Button onClick={() => handleSelectRequestForDeletion(request)}>Delete</Button>
                            </div>
                        ))}
                    </div>

                    {/* Modal Confirmation */}
                    {isModalOpen && (
                        <Modal
                            title="Confirm Deletion"
                            message={`Are you sure you want to delete the operation request with record number ${selectedRequest?.recordNumber}? This action cannot be undone.`}
                            onClose={() => setModalOpen(false)}
                            onConfirm={handleDeleteOperationRequest}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DeleteOperationRequest;
