import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOperationRequest } from '../../services/OperationRequestService';
import Button from '../../components/Buttons/Buttons';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './CreateOperationRequest.css';

const CreateOperationRequest: React.FC = () => {
    const navigate = useNavigate();
    const [newRequestData, setNewRequestData] = useState({
        deadline: '',
        priority: '',
        userId: '',
        operationTypeName: '',
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewRequestData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateOperationRequest = async (e: React.FormEvent) => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await createOperationRequest( newRequestData );
            setSuccessMessage('Operation Request created successfully!');
            setNewRequestData({ deadline: '', priority: '', userId: '', operationTypeName: '' });
            // Redirect to the operations list or another page if needed
            navigate('/operationRequest');
        } catch (error) {
            setErrorMessage('Failed to create Operation Request.');
        } finally {
            setLoading(false);
        }
    };

    const staffMenuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
        { id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel' },
      ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={staffMenuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Operation Request</h1>
                    {/* Form for creating operation request */}
                    <form onSubmit={handleCreateOperationRequest} className="request-form">
                        <div className="form-group">
                            <label htmlFor="deadline">Deadline</label>
                            <input
                                type="datetime-local"
                                id="deadline"
                                name="deadline"
                                value={newRequestData.deadline}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <select
                                name="priority"
                                id="priority"
                                value={newRequestData.priority}
                                onChange={handleChange}
                                className='input input-bordered w-full mb-2'
                                title="Priority"
                                required
                                >
                                    
                                    <option value="LOW">LOW</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HIGH">HIGH</option>
                                </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="userId">Email</label>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                value={newRequestData.userId}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="operationTypeName">Operation Type</label>
                            <input
                                type="text"
                                id="operationTypeName"
                                name="operationTypeName"
                                value={newRequestData.operationTypeName}
                                onChange={handleChange}
                                placeholder="Operation Type"
                                required
                            />
                        </div>

                        {/* Display messages */}
                        {successMessage && <div className="success-message">{successMessage}</div>}
                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <div className="form-group">
                            <Button onClick={() => handleCreateOperationRequest({} as React.FormEvent)} className="button button-primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Request'}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreateOperationRequest;