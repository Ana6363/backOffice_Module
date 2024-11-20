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
        deadLine: '',
        priority: '',
        recordNumber: '',
        status: '',
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
        e.preventDefault(); // Prevent page reload on form submit
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await createOperationRequest(newRequestData);
            setSuccessMessage('Operation Request created successfully!');
            setNewRequestData({ deadLine: '', priority: '', recordNumber: '', status: '', operationTypeName: '' });
            // Redirect to the operations list or another page if needed
            navigate('/operationRequest');
        } catch (error) {
            setErrorMessage('Failed to create Operation Request.');
        } finally {
            setLoading(false);
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
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Operation Request</h1>
                    {/* Form for creating operation request */}
                    <form onSubmit={handleCreateOperationRequest} className="request-form">
                        <div className="form-group">
                            <label htmlFor="deadline">Deadline</label>
                            <input
                                type="datetime-local"
                                id="deadline"
                                name="deadline"
                                value={newRequestData.deadLine}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <input
                                type="text"
                                id="priority"
                                name="priority"
                                value={newRequestData.priority}
                                onChange={handleChange}
                                placeholder="Priority"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="recordNumber">Record Number</label>
                            <input
                                type="text"
                                id="recordNumber"
                                name="recordNumber"
                                value={newRequestData.recordNumber}
                                onChange={handleChange}
                                placeholder="Record Number"
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
