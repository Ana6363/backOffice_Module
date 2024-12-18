import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSpecialization } from '../../../services/SpecializationsService';
import Button from '../../../components/Buttons/Buttons';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';

const CreateSpecialization: React.FC = () => {
    const navigate = useNavigate();

    const [specializationData, setSpecializationData] = useState({
        specializationName: '',
        specializationDescription: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSpecializationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setError(null); // Limpa erros anteriores

        try {
            await addSpecialization(specializationData);
            alert('Specialization created successfully');
            navigate('/admin/specializations'); // Redireciona para a página de specializations
        } catch (error) {
            console.error('Error creating specialization:', error);
            setError('Error creating specialization. Please try again.');
        }
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' },
        { id: 5, name: 'Manage Specializations', route: '/admin/specializations' },
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Specialization</h1>
                    {error && <p className="error-message">{error}</p>} {/* Exibe mensagens de erro, se existirem */}
                    <form onSubmit={handleSubmit} className="specialization-form">
                        <div className="form-group">
                            <label htmlFor="specializationName">Specialization Name</label>
                            <input
                                type="text"
                                id="specializationName"
                                name="specializationName"
                                value={specializationData.specializationName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="specializationDescription">Specialization Description</label>
                            <input
                                type="text"
                                id="specializationDescription"
                                name="specializationDescription"
                                value={specializationData.specializationDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Button type="submit" className="button button-primary">
                                Create Specialization
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreateSpecialization;
