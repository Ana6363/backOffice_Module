// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOperationTypes, updateOperationType } from '../../../services/OpTypeService';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import './UpdateOpType.css';

const UpdateOpType: React.FC = () => {
    const { operationTypeId } = useParams<{ operationTypeId: string }>();
    const navigate = useNavigate();
    const [opType, setOpType] = useState<any | null>(null); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [formData, setFormData] = useState<any>({}); 

    useEffect(() => {
        const fetchOpTypeById = async () => {
            try {
                const data = await fetchOperationTypes();

                if (data && data.operationType && data.operationType.$values) {
                    const operationTypes = data.operationType.$values;

                    const operationType = operationTypes.find(
                        (op) => op.operationTypeId === operationTypeId
                    );

                    if (operationType) {
                        const processedOpType = {
                            ...operationType,
                            specializations: operationType.specializations?.$values?.map((spec: any) => ({
                                name: spec.name,
                                neededPersonnel: spec.neededPersonnel,
                            })) || [],
                        };

                        setOpType(processedOpType);
                        setFormData(processedOpType);
                    } else {
                        console.error('Operation type not found');
                        alert('Operation type not found');
                        navigate('/admin/opTypes');
                    }
                } else {
                    console.error('Unexpected data format:', data);
                    alert('Error loading operation types.');
                    navigate('/admin/opTypes');
                }
            } catch (error) {
                console.error('Error fetching operation type:', error);
                alert('Error loading operation type.');
                navigate('/admin/opTypes');
            } finally {
                setLoading(false);
            }
        };

        if (operationTypeId) {
            fetchOpTypeById();
        }
    }, [operationTypeId, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!formData.operationTypeId) {
                throw new Error('Operation Type ID is missing');
            }

            console.log('Data to send to backend:', formData);

            const dataToSend = {
                ...formData,
                specializations: formData.specializations || [],
            };

            console.log('Sending data:', dataToSend);

            await updateOperationType(dataToSend);

            const updatedData = await fetchOperationTypes();
            console.log('Updated Operation Types:', updatedData);

            setOpType(updatedData);
            alert('Operation Type updated successfully.');
            navigate('/admin/opTypes');
        } catch (error) {
            console.error('Error updating operation type:', error);
            alert('Error saving changes.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!opType) {
        return <div>No operation type data available.</div>;
    }

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: 'opTypes' },
        { id: 5, name: 'Manage Specializations', route: '/admin/specializations' },

    ];

    return (
        <div>
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-8">Update Operation Type</h2>
                    <div className="operation-type-form">
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Operation Type Name:</strong></td>
                                    <td>
                                        <input 
                                                type="text" 
                                                name="operationTypeName" 
                                                className="disabled-input"
                                                value={formData.operationTypeName} 
                                                disabled 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Specializations:</strong></td>
                                    <td>
                                        {formData.specializations && formData.specializations.length > 0 ? (
                                            formData.specializations.map((spec: any, index: number) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    className="disabled-input"
                                                    value={`${spec.name} - Personnel: ${spec.neededPersonnel}`}
                                                    disabled
                                                />
                                            ))
                                        ) : (
                                            <span>No specializations assigned.</span>
                                        )}
                                    </td>
                                </tr>

                                
                                <tr>
                                    <td><strong>Preparation Time:</strong></td>
                                    <td><input type="number" id="preparationTime" name="preparationTime" value={formData.preparationTime} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <td><strong>Surgery Time:</strong></td>
                                    <td><input type="number" name="surgeryTime" value={formData.surgeryTime} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <td><strong>Cleaning Time:</strong></td>
                                    <td><input type="number" name="cleaningTime" value={formData.cleaningTime} onChange={handleInputChange} /></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="buttons">
                            <Button onClick={() => navigate(`/admin/opTypes`)} className="button button-cancel">Back to List</Button>
                            <Button onClick={handleSaveChanges} className="button button-primary">Save Changes</Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UpdateOpType;
