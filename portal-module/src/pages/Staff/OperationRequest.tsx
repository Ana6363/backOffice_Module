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
                setOperationRequestsList(data);
            } else {
                console.error('No operation requests found.');
                setRequestData({
                    deadLine: '',
                    priority: '',
                    recordNumber: '',
                    status: '',
                    operationTypeName: '',
                }); // Reset the request data
            }
        } catch (error) {
            console.error('Failed to load operation requests:', error);
            setRequestData({
                deadLine: '',
                priority: '',
                recordNumber: '',
                status: '',
                operationTypeName: '',
            }); // Reset the request data
        }
    }, [filterData]);

    useEffect(() => {
        loadOperationRequests();
    }, [loadOperationRequests]);

    

    const handleNavigateToCreate = () => {
        navigate('/operationRequest/create'); // Navigate to the create page
    };

    const handleNavigateToUpdate = () => {
        if (!selectedOperationRequest) {
            alert('No operation request selected.');
            return;
        }
        navigate('/operationRequest/update', { state: { selectedOperationRequest } }); // Passing selected request to the update page
    };

    const handleNavigateToDelete = () => {
        if (!selectedOperationRequest) {
            alert('No operation request selected.');
            return;
        }
        openModal(
            'Confirm Deletion',
            `Are you sure you want to delete the request for record number ${selectedOperationRequest.recordNumber}?`,
            async () => {
                try {
                    await deleteOperationRequest(selectedOperationRequest.recordNumber);
                    setOperationRequestsList((prevRequests) =>
                        prevRequests.filter((request) => request.recordNumber !== selectedOperationRequest.recordNumber)
                    );
                    closeModal();
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
                                { key: 'recordNumber', label: 'Record Number' },
                                { key: 'priority', label: 'Priority' },
                                { key: 'deadLine', label: 'Deadline' },
                                { key: 'status', label: 'Status' },
                                { key: 'operationTypeName', label: 'Operation Type' },
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
