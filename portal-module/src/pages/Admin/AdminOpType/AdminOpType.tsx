import React, { useState, useEffect } from 'react';
import { fetchOperationTypes } from '../../../services/OpTypeService';
import { useNavigate } from 'react-router-dom';
import SelectableTable from '../../../components/Table/SelectableTable';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import './AdminOpType.css';

const AdminOpType: React.FC = () => {
    const navigate = useNavigate();
    const [opTypeList, setOpTypeList] = useState<any[]>([]);
    const [selectedOpType, setSelectedOpType] = useState<any | null>(null);

    
    const loadOperationTypes = async () => {
        try {
            const data = await fetchOperationTypes();
    
            if (data && data.operationType && data.operationType.$values) {
                const operationTypes = data.operationType.$values;
    
                const processedOpTypes = operationTypes.map((operationType: { specializations: { $values: any[]; }; }) => ({
                    ...operationType,
                    specializationDetails: operationType.specializations && operationType.specializations.$values && operationType.specializations.$values.length > 0
                        //? operationType.specializations.$values.map(spec => `${spec.name.padEnd(20, ' ')} : ${spec.neededPersonnel} `).join('\n') 
                        ? operationType.specializations.$values.map(spec => ` ${spec.neededPersonnel} ${spec.name.padEnd(20, '')},  `).join('\n') 

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
        navigate('/admin/opTypes/create');
    };

    const handleUpdateOpType = () => {
        if (!selectedOpType) {
            alert('No operation type selected.');
            return;
        }
        navigate(`/admin/opTypes/update/${selectedOpType.operationTypeId}`);
    };

    const handleDeleteOpType = () => {
        if (selectedOpType) {
            navigate(`/admin/opTypes/delete/${selectedOpType.operationTypeName}`);
        } else {
            alert('No operation type selected.');
        }
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' },
        { id: 5, name: 'Schedule Surgeries', route: '/admin/schedule' },
        { id: 6, name: 'Manage Surgery Rooms', route: '/admin/surgeries' },
        { id: 7, name: 'Manage Specializations', route: '/admin/specializations' },
        { id: 8, name: 'Manage Room Types', route: '/admin/roomtypes' },
        { id: 9, name: 'Manage Allergies', route: '/admin/allergies' }
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Admin Operation Type Page</h1>

                    <div className="table-container">
                        <SelectableTable
                            data={opTypeList}
                            headers={[
                                { key: 'operationTypeName', label: 'Operation Type Name' },
                                { key: 'preparationTime', label: 'Preparation Time' },
                                { key: 'surgeryTime', label: 'Surgery Time' },
                                { key: 'cleaningTime', label: 'Cleaning Time' },
                                //{ key: 'specialization', label: 'Specialization' },
                                //{ key: 'neededPersonnel', label: 'Needed Personnel' }, 
                                { key: 'specializationDetails', label: 'Specializations (Personnel)' }, 

                            ]}
                            onRowSelect={setSelectedOpType}
                        />
                    </div>

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
            <Footer />
        </div>
    );
};

export default AdminOpType;
