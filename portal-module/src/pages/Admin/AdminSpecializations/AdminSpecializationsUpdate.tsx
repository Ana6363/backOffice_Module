import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSpecializations, updateSpecialization } from '../../../services/SpecializationsService';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import './CreateAndUpdateSpecialization.css';

const UpdateSpecialization: React.FC = () => {
    const { specializationId } = useParams(); // Get the specializationId from URL
    const navigate = useNavigate();

    const [specializationData, setSpecializationData] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        specializationId: '',
        specializationDescription: '',
    });

    useEffect(() => {
        const fetchSpecializationData = async () => {
            try {
                const fetchedSpecialization = await fetchSpecializations({ specializationId: specializationId || '' });

                if (fetchedSpecialization) {
                    setSpecializationData(fetchedSpecialization);
                    setFormData({
                        specializationId: fetchedSpecialization.specializationId,
                        specializationDescription: fetchedSpecialization.specializationDescription,
                    });
                } else {
                    console.error('Specialization not found');
                    alert('Specialization not found');
                    navigate('/admin/specializations');
                }
            } catch (error) {
                console.error('Error fetching specialization data:', error);
                alert('Error fetching specialization data');
            }
        };

        if (specializationId) {
            fetchSpecializationData();
        }
    }, [specializationId, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            await updateSpecialization(formData); // Send updated specialization data
            alert('Specialization updated successfully');
            navigate('/admin/specializations'); // Redirect to the specializations list page
        } catch (error) {
            console.error('Error updating specialization:', error);
            alert('Error updating specialization');
        }
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Specializations', route: '/admin/specializations' },
        { id: 4, name: 'Manage Staff', route: '/admin/staff' },
    ];

    return (
        <div className="update-specialization-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Update Specialization</h1>

                    {specializationData ? (
                        <form onSubmit={handleSubmit} className="update-specialization-form">
                            <div className="form-group">
                                <label htmlFor="specializationId">Specialization ID</label>
                                <input
                                    type="text"
                                    id="specializationId"
                                    name="specializationId"
                                    value={formData.specializationId}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="specializationDescription">Specialization Description</label>
                                <input
                                    type="text"
                                    id="specializationDescription"
                                    name="specializationDescription"
                                    value={formData.specializationDescription}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <Button onClick={() => handleSubmit({} as React.FormEvent)} className="button button-primary">
                                Update Specialization
                            </Button>
                        </form>
                    ) : (
                        <p>Loading specialization data...</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UpdateSpecialization;
