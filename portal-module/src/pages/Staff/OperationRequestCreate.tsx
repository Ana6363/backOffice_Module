import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOperationRequest } from '../../services/OperationRequestService';
import Button from '../../components/Buttons/Buttons';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './UpdateOpRequest.css';

const CreateOperationRequest: React.FC = () => {
    const navigate = useNavigate();
    const [operationRequests, setOperationRequests] = useState<any[]>([]);
    const [editData, setEditData] = useState<any>(null);
    const [newRequestData, setNewRequestData] = useState({
        deadline: '',
        priority: '',
        recordNumber: '',
        status: 'PENDING',
        operationTypeName: '',
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewRequestData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateOperationRequest = async () => {
        try {
            await createOperationRequest(newRequestData);
            alert('Operation Request created successfully!');
            setNewRequestData({ deadline: '', priority: '', recordNumber: '', status: 'PENDING', operationTypeName: '' });
        } catch (error) {
            alert('Failed to create Operation Request.');
        }
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
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Patient</h1>
                    <form onSubmit={handleCreateOperationRequest} className="patient-form">
                        <div className="form-group">
                            <label htmlFor="deadline">Deadline</label>
                            <input
                                type="datetime-local"
                                value={newRequestData.deadline}
                                onChange={ handleChange}
                                placeholder="Deadline"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <input
                                type="text"
                                value={newRequestData.priority}
                                onChange={handleChange}
                                placeholder="Priority"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="recordNumber">Record Number</label>
                            <input
                                type="text"
                                value={newRequestData.recordNumber}
                                onChange={handleChange}
                                placeholder="Record Number"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                value={newRequestData.operationTypeName}
                                onChange={handleChange}
                                placeholder="Operation Type"
                            />
                        </div>

                        

                        <div className="form-group">
                            {/* Pass an empty function to match the expected Button signature */}
                            <Button onClick={handleCreateOperationRequest} className="button button-primary">
                                Create Patient
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer /> {/* Footer at the bottom */}
        </div>
    );
};

export default CreateOperationRequest;