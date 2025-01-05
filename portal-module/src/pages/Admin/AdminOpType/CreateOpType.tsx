import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOperationType } from '../../../services/OpTypeService';
import Button from '../../../components/Buttons/Buttons';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import { specializations } from './Specializations'; 
import './CreateOpType.css'; 
import { fetchSpecializations } from '../../../services/SpecializationsService';

const CreateOpType: React.FC = () => {
    const navigate = useNavigate();  
    const [operationTypeData, setOperationTypeData] = useState({
        operationTypeName: '',
        preparationTime: 0,
        surgeryTime: 0,
        cleaningTime: 0,
        specializations: [{ name: '', neededPersonnel: 1 }] 
    });

    const [specializations, setSpecializations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const loadSpecializations = async () => {
            try {
                const data = await fetchSpecializations(); 
                setSpecializations(data); 
            } catch (error) {
                console.error('Failed to fetch specializations:', error);
            }
            finally {
                setLoading(false); 
            }
        };

        loadSpecializations(); 
    }, []);


    const handleSpecializationChange = (index: number, key: string, value: string | number) => {
        const updatedSpecializations = [...operationTypeData.specializations];
        updatedSpecializations[index] = {
            ...updatedSpecializations[index],
            [key]: value,
        };
        setOperationTypeData({
            ...operationTypeData,
            specializations: updatedSpecializations,
        });
    };

    const addSpecialization = () => {
        setOperationTypeData({
            ...operationTypeData,
            specializations: [...operationTypeData.specializations, { name: '', neededPersonnel: 1 }],
        });
    };

    const removeSpecialization = (index: number) => {
        const updatedSpecializations = operationTypeData.specializations.filter((_, i) => i !== index);
        setOperationTypeData({
            ...operationTypeData,
            specializations: updatedSpecializations,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Ensure Op. Type has at least one Specialization
        if (operationTypeData.specializations.every(spec => spec.name.trim() === '')) {
            alert('Please select at least one specialization.');
            return;
        }

        try {
            await createOperationType(operationTypeData);
            alert('Operation Type created successfully');
            navigate('/admin/opTypes');
        } catch (error) {
            console.error('Error creating operation type:', error);
            alert('Failed to create Operation Type');
        }
    };
    const menuItems = [
        {id: 1, name: 'Main Page', route: '/admin'},
        {id: 2, name: 'Manage Patients', route: '/admin/patient'},
        {id: 3, name: 'Manage Staff', route: '/admin/staff'},
        {id: 4, name: 'Manage Operation Types', route: '/admin/opTypes'},
        {id: 5, name: 'Schedule Surgeries', route: '/admin/schedule'},
        {id: 6, name: 'Manage Surgery Rooms', route: '/admin/surgeries'},
        {id: 7, name: 'Manage Specializations', route: '/admin/specializations'},
        {id: 8, name: 'Manage Room Types', route: '/admin/roomtypes'},
        {id: 9, name: 'Manage Allergies', route: '/admin/allergies'},
        {id: 10, name: 'Manage Medical Conditions', route: '/admin/medicalConditions'},
    ];

    const goBack = () => {
        navigate(-1); 
    };

    const isFormValid = operationTypeData.specializations.every(
        spec => spec.name.trim() !== '' && spec.neededPersonnel > 0
    );

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Operation Type</h1>
                    <form onSubmit={handleSubmit} className="optype-form">
                        <div className="form-group">
                            <label htmlFor="operationTypeName">Operation Type Name</label>
                            <input
                                type="text"
                                id="operationTypeName"
                                name="operationTypeName"
                                value={operationTypeData.operationTypeName}
                                onChange={(e) => setOperationTypeData({ ...operationTypeData, operationTypeName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="preparationTime">Preparation Time (minutes)</label>
                            <input
                                type="number"
                                id="preparationTime"
                                name="preparationTime"
                                value={operationTypeData.preparationTime}
                                onChange={(e) => setOperationTypeData({ ...operationTypeData, preparationTime: +e.target.value })}
                                min='0'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="surgeryTime">Surgery Time (minutes)</label>
                            <input
                                type="number"
                                id="surgeryTime"
                                name="surgeryTime"
                                value={operationTypeData.surgeryTime}
                                onChange={(e) => setOperationTypeData({ ...operationTypeData, surgeryTime: +e.target.value })}
                                min='0'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cleaningTime">Cleaning Time (minutes)</label>
                            <input
                                type="number"
                                id="cleaningTime"
                                name="cleaningTime"
                                value={operationTypeData.cleaningTime}
                                onChange={(e) => setOperationTypeData({ ...operationTypeData, cleaningTime: +e.target.value })}
                                min='0'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <h3 className="text-xl font-semibold">Specializations</h3>
                            {
                            loading ? (  
                                <div>Loading specializations...</div>
                            ) : (
                                operationTypeData.specializations.map((spec, index) => (
                                    <div key={index} className="specialization-group">
                                        <select
                                            value={spec.name}
                                            onChange={(e) => handleSpecializationChange(index, 'name', e.target.value)}
                                            required
                                        >
                                            <option value="">Select Specialization</option>
                                            {specializations.map((specialization, i) => (
                                                <option key={i} value={specialization.name}>
                                                    {specialization.name}
                                                </option>
                                            ))}
                                        </select>
                        
                                        <input
                                            type="number"
                                            placeholder="Needed Personnel"
                                            value={spec.neededPersonnel}
                                            onChange={(e) => handleSpecializationChange(index, 'neededPersonnel', +e.target.value)}
                                            min='1'
                                            required
                                        />
                        
                                        <Button 
                                            onClick={() => removeSpecialization(index)} 
                                            className="button-danger"
                                        >
                                            Remove Specialization
                                        </Button>
                                    </div>
                                ))
                            )}

                            <Button 
                                onClick={addSpecialization} 
                                className="button-primary"
                            >
                                Add New Specialization
                            </Button>
                        </div>

                        <div className="form-group">
                            <button 
                                type="submit" 
                                disabled={!isFormValid} 
                                className={!isFormValid ? 'button-disabled' : ''} 
                            >
                                Create Operation Type
                            </button>
                        </div>
                    </form>

                    <Button onClick={goBack} className="button-secondary">
                        Go Back
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreateOpType;
