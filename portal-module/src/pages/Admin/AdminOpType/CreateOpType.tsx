
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOperationType } from '../../../services/OpTypeService';
import Button from '../../../components/Buttons/Buttons';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import './CreateOpType.css'; 

const CreateOpType: React.FC = () => {
    const navigate = useNavigate();  // Hook de navegação do React Router
    const [operationTypeData, setOperationTypeData] = useState({
        operationTypeName: '',
        preparationTime: 0,
        surgeryTime: 0,
        cleaningTime: 0,
        specializations: [{ name: '', neededPersonnel: 0 }] // Inicializa com uma especialização
    });

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
            specializations: [...operationTypeData.specializations, { name: '', neededPersonnel: 0 }],
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' },
    ];

    // Função para retroceder à página anterior
    const goBack = () => {
        navigate(-1); // Retrocede uma página no histórico
    };

    // Verificar se há pelo menos uma especialização com nome e número de pessoal
    const isFormValid = operationTypeData.specializations.some(
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
                                required
                            />
                        </div>

                        <div className="form-group">
                            <h3 className="text-xl font-semibold">Specializations</h3>
                            {operationTypeData.specializations.map((spec, index) => (
                                <div key={index} className="specialization-group">
                                    <input
                                        type="text"
                                        placeholder="Specialization name"
                                        value={spec.name}
                                        onChange={(e) => handleSpecializationChange(index, 'name', e.target.value)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Needed Personnel"
                                        value={spec.neededPersonnel}
                                        onChange={(e) => handleSpecializationChange(index, 'neededPersonnel', +e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                            
                        </div>

                        <div className="form-group">
                            {/* Botão de criação desabilitado até que uma especialização válida seja adicionada */}
                            <button 
                                type="submit" 
                                disabled={!isFormValid} // Botão desabilitado se não houver especializações válidas
                                className={!isFormValid ? 'button-disabled' : ''} // Adiciona classe para estilo desabilitado
                            >
                                Create Operation Type
                            </button>
                        </div>
                    </form>

                    {/* Botão para retroceder à página anterior */}
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
