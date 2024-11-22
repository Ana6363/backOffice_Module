import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOperationTypes } from '../../../services/OpTypeService'; 
import Button from '../../../components/Buttons/Buttons'; 
import Footer from '../../../components/Footer/Footer'; 
import Navbar from '../../../components/Navbar/Navbar'; 
import './UpdateOpType.css'; 

const UpdateOpType: React.FC = () => {
    const { operationTypeId } = useParams<{ operationTypeId: string }>(); 
    const navigate = useNavigate();

    const [opType, setOpType] = useState<any | null>(null); 
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const fetchOpTypeById = async () => {
            try {
                const data = await fetchOperationTypes(); 

                if (data && data.operationType && data.operationType.$values) {
                    const operationTypes = data.operationType.$values;
                    const foundOpType = operationTypes.find(
                        (operationType) => operationType.operationTypeId === operationTypeId
                    );

                    if (foundOpType) {
                        const processedOpType = {
                            ...foundOpType,
                            specialization: foundOpType.specializations && 
                                           foundOpType.specializations.$values && 
                                           foundOpType.specializations.$values.length > 0
                                ? foundOpType.specializations.$values[0].name
                                : "No specialization assigned",
                        };
                        setOpType(processedOpType); 
                    } else {
                        console.error("Operation type not found");
                        alert("Operation type not found");
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

    if (loading) {
        return <div>Loading...</div>; // Show while data is loading
    }

    if (!opType) {
        return <div>No operation type data available.</div>; // Show if there are no Op Types 
    }
    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: 'opTypes' },
    ];

    return (
        <div className="update-opType-wrapper">
            <Navbar menuItemsProp={menuItems} /> {/* Navbar with menu items */}
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Update Operation Type</h1>

                    {opType ? (
                        <form className="update-opType-form">
                            <table className="operation-type-table">
                                <tbody>
                                    <tr>
                                        <td><strong>Operation Type Name:</strong></td>
                                        <td><input
                                            type="text"
                                            value={opType.operationTypeName || ''}
                                            disabled
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Specialization:</strong></td>
                                        <td><input
                                            type="text"
                                            value={opType.specialization || ''}
                                            disabled
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Preparation Time (min):</strong></td>
                                        <td><input
                                            type="number"
                                            value={opType.preparationTime || ''}
                                            onChange={(e) => setOpType({ ...opType, preparationTime: e.target.value })}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Surgery Time (min):</strong></td>
                                        <td><input
                                            type="number"
                                            value={opType.surgeryTime || ''}
                                            onChange={(e) => setOpType({ ...opType, surgeryTime: e.target.value })}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cleaning Time (min):</strong></td>
                                        <td><input
                                            type="number"
                                            value={opType.cleaningTime || ''}
                                            onChange={(e) => setOpType({ ...opType, cleaningTime: e.target.value })}
                                        /></td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="form-actions">
                                <Button className="button button-secondary" onClick={() => navigate('/admin/opTypes')}>
                                    Back to List
                                </Button>
                                <Button className="button button-primary" onClick={() => alert('Changes Saved!')}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <p>Loading operation type data...</p> 
                    )}
                </div>
            </main>
            <Footer /> {/* Footer */}
        </div>
    );
};

export default UpdateOpType;
