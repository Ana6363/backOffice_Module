import React, { useState, useEffect, useCallback } from 'react';
import { fetchOperationTypes, createOperationType, updateOperationType, deleteOperationType } from '../services/OpTypeService';

const AdminOpType: React.FC = () => {
    const [opTypeList, setOpTypeList] = useState<any[]>([]);
    const [opTypeData, setOpTypeData] = useState({
        operationTypeId: '',
        operationTypeName: '',
        operationTime: 0,
        specializations: [] as string[],
    });
    const [mode, setMode] = useState<'create' | 'update'>('create'); // 'create' or 'update'

    const loadOpTypes = useCallback(async () => {
        try {
            const data = await fetchOperationTypes();
            const opTypeMembers = data.operationType?.$values || []; // Adjust based on data structure
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
                operationTime: 0,
                specializations: [],
            }); // Reset data for next create
            setMode('create'); // Switch to create mode
        } catch (error) {
            console.error('Error creating operation type:', error);
        }
    };

    const handleUpdateOpType = async () => {
        try {
            await updateOperationType(opTypeData);
            alert('Operation Type updated successfully');
            loadOpTypes();
            setMode('create'); // Switch to create mode after update
        } catch (error) {
            console.error('Error updating operation type:', error);
        }
    };

    const handleDeleteOpType = async (operationTypeName: string) => {
        try {
            await deleteOperationType(operationTypeName);
            alert('Operation Type deleted successfully');
            loadOpTypes();
        } catch (error) {
            console.error('Error deleting operation type:', error);
        }
    };

    const handleSpecializationsChange = (value: string) => {
        setOpTypeData({
            ...opTypeData,
            specializations: value.split(',').map((item) => item.trim()),
        });
    };

    const handleSelectOpType = (opType: any) => {
        setOpTypeData({
            operationTypeId: opType.operationTypeId,
            operationTypeName: opType.operationTypeName,
            operationTime: opType.operationTime,
            specializations: opType.specializations?.$values?.map((spec: any) => spec.name) || [],
        });
        setMode('update'); // Switch to update mode
    };

    return (
        <div>
            <h1>Admin Operation Types</h1>

            <div>
                <h2>{mode === 'create' ? 'Create Operation Type' : 'Update Operation Type'}</h2>
                {/* Operation Type inputs */}
                {mode === 'update' && (
                    <input
                        type="text"
                        placeholder="Operation Type ID"
                        value={opTypeData.operationTypeId}
                        onChange={(e) => setOpTypeData({ ...opTypeData, operationTypeId: e.target.value })}
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
                    placeholder="Operation Time"
                    value={opTypeData.operationTime}
                    onChange={(e) => setOpTypeData({ ...opTypeData, operationTime: parseInt(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Specializations (comma-separated)"
                    value={opTypeData.specializations.join(', ')}
                    onChange={(e) => handleSpecializationsChange(e.target.value)}
                />

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
                            <th>Operation Time</th>
                            <th>Specializations</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opTypeList.map((opType) => (
                            <tr key={opType.operationTypeId}>
                                <td>{opType.operationTypeId}</td>
                                <td>{opType.operationTypeName}</td>
                                <td>{opType.operationTime}</td>
                                <td>
                                    {
                                        Array.isArray(opType.specializations)
                                            ? opType.specializations.join(', ')
                                            : Array.isArray(opType.specializations?.$values)
                                            ? opType.specializations.$values.map((spec: any) => spec.name).join(', ')
                                            : 'N/A'
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteOpType(opType.operationTypeName)}>Delete</button>
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
