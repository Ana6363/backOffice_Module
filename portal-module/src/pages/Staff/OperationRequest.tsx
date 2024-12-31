import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOperationRequest, createOperationRequest, updateOperationRequest, deleteOperationRequest } from '../../services/OperationRequestService';
import './StaffPage.css';
import Button from '../../components/Buttons/Buttons'; 
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SelectableTable from '../../components/Table/SelectableTable';

const OperationRequest: React.FC = () => {
    const navigate = useNavigate();

    const [operationRequestsList, setOperationRequestsList] = useState<any[]>([]);
    const [filterData, setFilterData] = useState({
        deadLine: '',
        priority: '',
        recordNumber: '',
        status: '',
        operationTypeName: '',
    });

    const getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Example token from local storage
        };
    };

    const [requestData, setRequestData] = useState({
        deadLine: '',
        priority: '',
        recordNumber: '',
        status: '',
        operationTypeName: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOperationRequest, setSelectedOperationRequest] = useState<any | null>(null);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        action: () => {},
    });

    const loadOperationRequests = useCallback(async () => {
        try {
            const data = await fetchOperationRequest(filterData);
            console.log('Fetched Operation Requests:', data);
            if (data) {
                const updatedRequests = await Promise.all(
                    data.map(async (request: any) => {
                        const recordNumber = request.recordNumber;
                        if (!recordNumber) return request;
    
                        try {
                            const patientResponse = await fetch(
                                `https://api-dotnet.hospitalz.site/api/v1/patient/filter?recordNumber=${recordNumber}`,
                                { method: 'GET', headers: getHeaders() }
                            );
    
                            if (!patientResponse.ok) throw new Error(`Failed to fetch patient for recordNumber: ${recordNumber}`);
                            const patientData = await patientResponse.json();
                            const userId =
                                patientData?.patients?.$values?.[0]?.patient?.userId || 'Unknown User';
                            return { ...request, recordNumber: userId };
                        } catch (error) {
                            console.error(`Error fetching patient for recordNumber: ${recordNumber}`, error);
                            return { ...request, recordNumber: 'Error Fetching User' };
                        }
                    })
                );
    
                setOperationRequestsList(updatedRequests);
            } else {
                console.error('No operation requests found.');
                setRequestData({
                    deadLine: '',
                    priority: '',
                    recordNumber: '',
                    status: '',
                    operationTypeName: '',
                });
            }
        } catch (error) {
            console.error('Failed to load operation requests:', error);
            setRequestData({
                deadLine: '',
                priority: '',
                recordNumber: '',
                status: '',
                operationTypeName: '',
            });
        }
    }, [filterData]);

    useEffect(() => {
        loadOperationRequests();
    }, [loadOperationRequests]);

    

    const handleNavigateToCreate = () => {
        navigate('/operationRequest/create'); // Navigate to the create page
    };

    const handleNavigateToUpdate = () => {
        if (!selectedOperationRequest || !selectedOperationRequest.requestId) {
            alert('No operation request selected.');
            return;
        }
    
        // Use the actual ID in the navigation path
        navigate(`/operationRequest/update/${selectedOperationRequest.requestId}`);
    };

    const handleNavigateToCreateAppointment = () => {
        if (!selectedOperationRequest || !selectedOperationRequest.requestId) {
            alert('No operation request selected.');
            return;
        }
    
        navigate(`/operationRequest/createAppointment?requestId=${encodeURIComponent(selectedOperationRequest.requestId)}`);
    };
    
    
    

    const handleNavigateToDelete = () => {
        if (!selectedOperationRequest || !selectedOperationRequest.requestId) {
            alert('No operation request selected.');
            return;
        }
    
        openModal(
            'Confirm Deletion',
            `Are you sure you want to delete this request}?`,
            async () => {
                try {
                    // Pass requestId to the delete operation service
                    await deleteOperationRequest(selectedOperationRequest.requestId);
                    setOperationRequestsList((prevRequests) =>
                        prevRequests.filter((request) => request.requestId !== selectedOperationRequest.requestId)
                    );
                    closeModal();
                    alert('Operation request deleted successfully!');
                } catch (error) {
                    console.error('Failed to delete operation request:', error);
                    closeModal();
                }
            }
        );
    };
    

    const openModal = (title: string, message: string, action: () => void) => {
        setModalContent({ title, message, action });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Operation Request Page</h1>

                    {/* Table Container */}
                    <div className="table-container">
                        <SelectableTable
                            data={operationRequestsList}
                            headers={[
                                { key: 'recordNumber', label: 'Email patient' },
                                { key: 'priority', label: 'Priority' },
                                { key: 'deadLine', label: 'Deadline' },
                                { key: 'status', label: 'Status' },
                                { key: 'operationType', label: 'Operation Type' },
                            ]}
                            onRowSelect={setSelectedOperationRequest}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <Button onClick={handleNavigateToCreate} className="button button-primary">
                            Create Request
                        </Button>
                        <Button onClick={handleNavigateToUpdate} disabled={!selectedOperationRequest} className="button button-primary">
                            Update Request
                        </Button>
                        <Button onClick={handleNavigateToDelete} disabled={!selectedOperationRequest} className="button button-danger">
                            {selectedOperationRequest?.isToBeDeleted ? 'Delete Request' : 'Delete Request'}
                        </Button>
                        <Button onClick={handleNavigateToCreateAppointment} disabled={!selectedOperationRequest} className="button button-primary">
                            Create Appointment
                        </Button>
                    </div>

                    {/* Modal for confirmation before delete/mark */}
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>{modalContent.title}</h2>
                                <p>{modalContent.message}</p>
                                <div className="modal-actions">
                                    <button onClick={modalContent.action} className="confirm-btn">
                                        Confirm
                                    </button>
                                    <button onClick={closeModal} className="cancel-btn">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer /> {/* Footer at the bottom */}
        </div>
    );
};

export default OperationRequest;