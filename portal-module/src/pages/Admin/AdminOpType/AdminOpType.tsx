import React, { useState, useEffect, useCallback } from 'react';
import { fetchOperationTypes, createOperationType, updateOperationType, deleteOperationType } from '../../../services/OpTypeService';
import { useNavigate } from 'react-router-dom';
import SelectableTable from '../../../components/Table/SelectableTable';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import './AdminOpType.css';

const AdminOpType: React.FC = () => {
    const navigate = useNavigate();
    

    const [opTypeList, setOpTypeList] = useState<any[]>([]);
    const [filter, setFilter] = useState({
        operationTypeName: '',
    });
    const [selectedOpType, setSelectedOpType] = useState<any | null>(null); // Selected operation type
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        action: () => {},
    });


const loadOperationTypes = async () => {
    try {
        const data = await fetchOperationTypes(); 

        if (data && data.operationType && data.operationType.$values) {
            const operationTypes = data.operationType.$values;

            const processedOpTypes = operationTypes.map((operationType) => ({
                ...operationType,
                specialization: operationType.specializations && operationType.specializations.$values && operationType.specializations.$values.length > 0
                    ? operationType.specializations.$values[0].name 
                    : "No specialization", 
            }));

            setOpTypeList(processedOpTypes); 
        } else if (data && Array.isArray(data)) {
            setOpTypeList(data); 
        } else {
            console.error('Unexpected data format:', data);
            setOpTypeList([]); 
        }
    } catch (error) {
        console.error('Error fetching operation types:', error);
        setOpTypeList([]); 
    }
};

useEffect(() => {
    loadOperationTypes();
}, []);


    const handleCreateOpType = () => {
        navigate('/admin/opType/create');  // Redirect to create new operation type page
    };

    const handleUpdateOpType = () => {
        if (!selectedOpType) {
            alert('No operation type selected.');
            return;
        }
        navigate(`/admin/opType/update/${selectedOpType.operationTypeId}`); // Redirect to update page with ID
    };

    

    const handleDeleteOpType = () => {
        if (selectedOpType) {
            // Redirects to new page to confirm deletion through name 
            navigate(`/admin/opTypes/delete/${selectedOpType.operationTypeName}`);
        } else {
            alert('No operation type selected.');
        }
    };




    const openModal = (title: string, message: string, action: () => void) => {
        setModalContent({ title, message, action });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' },
    ];


    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Admin Operation Type Page</h1>

                    {/* Table Container */}
                    <div className="table-container">
                        <SelectableTable
                            data={opTypeList}
                            headers={[
                                { key: 'operationTypeName', label: 'Operation Type Name' },
                                { key: 'preparationTime', label: 'Preparation Time' },
                                { key: 'surgeryTime', label: 'Surgery Time' },
                                { key: 'cleaningTime', label: 'Cleaning Time' },
                                { key: 'specialization', label: 'Specialization' },

                            ]}
                            onRowSelect={setSelectedOpType}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <Button onClick={handleCreateOpType} className="button button-primary">
                            Create Operation Type
                        </Button>
                        <Button onClick={handleUpdateOpType} disabled={!selectedOpType} className="button button-primary">
                            Update Operation Type
                        </Button>
                        <Button onClick={handleDeleteOpType} disabled={!selectedOpType} className="button button-danger">
                            Delete Operation Type
                        </Button>
                    </div>

                    
                </div>
            </main>
            <Footer /> {/* Footer at the bottom */}
        </div>
    );
};

export default AdminOpType;
