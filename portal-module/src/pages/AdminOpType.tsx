import React, { useState, useEffect, useCallback } from 'react';
import { fetchOperationTypes, createOperationType, updateOperationType, deleteOperationType } from '../services/OpTypeService';

const AdminOpType: React.FC = () => {
    const [opTypeList, setOpTypeList] = useState<any[]>([]);
    const [opTypeData, setOpTypeData] = useState({
        operationTypeId: '',
        operationTypeName: '',
        preparationTime: 0,
        surgeryTime: 0,
        cleaningTime: 0,
        specializations: [] as { name: string; neededPersonnel: number }[],
    });
    const [mode, setMode] = useState<'create' | 'update'>('create');

    const loadOpTypes = useCallback(async () => {
        try {
            const data = await fetchOperationTypes();
            const opTypeMembers = data.operationType?.$values || [];
            if (Array.isArray(opTypeMembers)) {
                setOpTypeList(opTypeMembers);
            } else {
                console.error('Expected operation types to be an array, received:', opTypeMembers);
                setOpTypeList([]);
            }
        } catch (error) {
            console.error('Error fetching operation types:', error);
            setOpTypeList([]);
        }
    }, []);

    useEffect(() => {
        loadOpTypes();
    }, [loadOpTypes]);

    const handleCreateOpType = async () => {
        try {
            await createOperationType(opTypeData);
            alert('Operation Type created successfully');
            loadOpTypes();
            setOpTypeData({
                operationTypeId: '',
                operationTypeName: '',
                preparationTime: 0,
                surgeryTime: 0,
                cleaningTime: 0,
                specializations: [],
            });
            setMode('create');
        } catch (error) {
            console.error('Error creating operation type:', error);
        }
    };

    const handleUpdateOpType = async () => {
        try {
            await updateOperationType(opTypeData);
            alert('Operation Type updated successfully');
            loadOpTypes();
            setMode('create');
        } catch (error) {
            console.error('Error updating operation type:', error);
        }
    };

    const handleDeleteOpType = async (operationTypeId: string) => {
        try {
            await deleteOperationType(operationTypeId);
            alert('Operation Type deleted successfully');
            loadOpTypes();
        } catch (error) {
            console.error('Error deleting operation type:', error);
        }
    };

    const handleSpecializationsChange = (index: number, key: string, value: string | number) => {
        const updatedSpecializations = [...opTypeData.specializations];
        updatedSpecializations[index] = {
            ...updatedSpecializations[index],
            [key]: value,
        };
        setOpTypeData({
            ...opTypeData,
            specializations: updatedSpecializations,
        });
    };

    const addSpecialization = () => {
        setOpTypeData({
            ...opTypeData,
            specializations: [...opTypeData.specializations, { name: '', neededPersonnel: 0 }],
        });
    };

    const handleSelectOpType = (opType: any) => {
        setOpTypeData({
            operationTypeId: opType.operationTypeId,
            operationTypeName: opType.operationTypeName,
            preparationTime: opType.preparationTime,
            surgeryTime: opType.surgeryTime,
            cleaningTime: opType.cleaningTime,
            specializations: opType.specializations?.$values?.map((spec: any) => ({
                name: spec.name,
                neededPersonnel: spec.neededPersonnel,
            })) || [],
        });
        setMode('update');
    };

    return (
        <div>
            <h1>Admin Operation Types</h1>

            <div>
                <h2>{mode === 'create' ? 'Create Operation Type' : 'Update Operation Type'}</h2>
                {mode === 'update' && (
                    <input
                        type="text"
                        placeholder="Operation Type ID"
                        value={opTypeData.operationTypeId}
                        onChange={(e) => setOpTypeData({ ...opTypeData, operationTypeId: e.target.value })}
                        readOnly
                    />
                )}
                <input
                    type="text"
                    placeholder="Operation Type Name"
                    value={opTypeData.operationTypeName}
                    onChange={(e) => setOpTypeData({ ...opTypeData, operationTypeName: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Preparation Time (minutes)"
                    value={opTypeData.preparationTime}
                    onChange={(e) => setOpTypeData({ ...opTypeData, preparationTime: parseInt(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Surgery Time (minutes)"
                    value={opTypeData.surgeryTime}
                    onChange={(e) => setOpTypeData({ ...opTypeData, surgeryTime: parseInt(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Cleaning Time (minutes)"
                    value={opTypeData.cleaningTime}
                    onChange={(e) => setOpTypeData({ ...opTypeData, cleaningTime: parseInt(e.target.value) })}
                />
                <h3>Specializations</h3>
                {opTypeData.specializations.map((spec, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Specialization Name"
                            value={spec.name}
                            onChange={(e) => handleSpecializationsChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Needed Personnel"
                            value={spec.neededPersonnel}
                            onChange={(e) => handleSpecializationsChange(index, 'neededPersonnel', parseInt(e.target.value))}
                        />
                    </div>
                ))}
                <button onClick={addSpecialization}>Add Specialization</button>
                <button onClick={mode === 'create' ? handleCreateOpType : handleUpdateOpType}>
                    {mode === 'create' ? 'Create' : 'Update'}
                </button>
            </div>

            <div>
                <h2>Operation Type List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Operation Type ID</th>
                            <th>Operation Type Name</th>
                            <th>Preparation Time</th>
                            <th>Surgery Time</th>
                            <th>Cleaning Time</th>
                            <th>Specializations</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opTypeList.map((opType) => (
                            <tr key={opType.operationTypeId}>
                                <td>{opType.operationTypeId}</td>
                                <td>{opType.operationTypeName}</td>
                                <td>{opType.preparationTime} min</td>
                                <td>{opType.surgeryTime} min</td>
                                <td>{opType.cleaningTime} min</td>
                                <td>
                                    {opType.specializations?.$values
                                        ?.map((spec: any) => `${spec.name} (${spec.neededPersonnel})`)
                                        .join(', ') || 'N/A'}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteOpType(opType.operationTypeId)}>Delete</button>
                                    <button onClick={() => handleSelectOpType(opType)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOpType;
