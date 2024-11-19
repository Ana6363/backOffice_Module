import React, { useState, useEffect, useCallback } from 'react';
import { deleteOperationRequest, fetchOperationRequest } from '../../services/OperationRequestService';
import './StafffPage.css';
import Button from '../../components/Buttons/Buttons';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/PopUp'; // Import Modal component
import Footer from '../../components/Footer/Footer';

const DeleteOperationRequest: React.FC = () => {
    const [operationRequests, setOperationRequests] = useState<any[]>([]);
    const [editData, setEditData] = useState<any>(null);
    const [newRequestData, setNewRequestData] = useState({
        deadline: '',
        priority: '',
        recordNumber: '',
        status: 'PENDING',
        operationTypeName: '',
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const loadOperationRequests = useCallback(async () => {
        try {
            const data = await fetchOperationRequest({});
            if (data) setOperationRequests(data);
        } catch (error) {
            console.error('Failed to load operation requests:', error);
        }
    }, []);

    useEffect(() => {
        loadOperationRequests();
    }, [loadOperationRequests]);

    const handleDeleteOperationRequest = async () => {
        const requestId = editData?.id; // Assuming editData contains the request ID
        if (!requestId) {
            alert('No request selected for deletion.');
            return;
        }
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
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
        
    ];

    return (
        <div className="app-wrapper"> {/* Ensure full-page layout */}
          <Navbar menuItemsProp={menuItems} />
          <main className="main-content"> {/* Main content to push footer down */}
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Confirm Delete</h1>
              <p>Are you sure you want to delete your profile?</p>
    
              <div className="flex justify-between mt-4">
                <Button onClick={() => setModalOpen(true)}>Confirm Delete</Button>
                <Button onClick={() => navigate('/')}>Cancel</Button>
              </div>
            </div>
    
           
              <Modal
                title="Confirm Deletion"
                message="Are you sure you want to delete your profile? This action cannot be undone."
                onClose={() => setModalOpen(false)}
                onConfirm={handleDeleteOperationRequest}
              />
            
          </main>
    
          <Footer /> {/* Footer at the bottom */}
        </div>
      );
    };
    
    export default DeleteOperationRequest;