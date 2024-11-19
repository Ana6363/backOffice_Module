import React, { useState, useEffect, useCallback } from 'react';
import { updateOperationRequest, fetchOperationRequest } from '../../services/OperationRequestService';
import Button from '../../components/Buttons/Buttons';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './UpdateOpRequest.css';  // Make sure the styles are consistent with your setup

const UpdateOperationRequest: React.FC = () => {
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

    const handleInputChange = (field: string, value: string, isEdit = false) => {
        if (isEdit) {
            setEditData((prev: any) => ({ ...prev, [field]: value }));
        } else {
            setNewRequestData((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleUpdateOperationRequest = async () => {
        try {
            await updateOperationRequest(editData);
            alert('Operation Request updated successfully!');
            setEditData(null);
            loadOperationRequests();
        } catch (error) {
            alert('Failed to update Operation Request.');
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
              <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
    
              <div className="mb-4">
                <label>Priority</label>
                <input
                    type="text"
                    value={editData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value, true)}
                    placeholder="Priority"
                />
              </div>
    
            <div className="mb-4">
                <select
                    value={editData.status}
                    onChange={(e) => handleInputChange('status', e.target.value, true)}
                    title = "Status"
                    >
                    <option value="PENDING">PENDING</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REJECTED">REJECTED</option>
                </select>
            </div>
    
            <div className="mb-4">
                <Button onClick={handleUpdateOperationRequest}>Save Changes</Button>
            </div>
        </div>
        </main>
    
          <Footer /> {/* Footer will be at the bottom */}
        </div>
      );

};

export default UpdateOperationRequest;