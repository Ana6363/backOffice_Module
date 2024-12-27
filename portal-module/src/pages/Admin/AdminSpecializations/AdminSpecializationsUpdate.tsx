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
        Name: '',
        Description: '',
    });

    useEffect(() => {
        const fetchSpecializationData = async () => {
            try {
                console.log("Attempting to fetch specialization with ID:", specializationId);

                if (!specializationId) {
                    console.error("specializationId is not available.");
                    alert("Specialization ID is missing.");
                    return;
                }

                // Ajuste para lidar com a resposta da API que retorna uma lista
                const fetchedSpecializations = await fetchSpecializations({}); // Aqui estamos a buscar todas as especializações

                console.log("Fetched Specializations Response:", fetchedSpecializations);

                // Verifique se obtemos uma lista de especializações e procure a especialização pelo nome ou ID
                const foundSpecialization = fetchedSpecializations?.find(
                    (spec: any) => spec.Name === specializationId || spec.id === specializationId
                );

                if (foundSpecialization) {
                    setSpecializationData(foundSpecialization);
                    setFormData({
                        Name: foundSpecialization.Name || '',
                        Description: foundSpecialization.Description || '',
                    });
                } else {
                    console.error('Specialization not found. Response:', fetchedSpecializations);
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
        e.preventDefault();
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
    return (
        <div className="update-specialization-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Update Specialization</h1>

                    {specializationData ? (
                        <form onSubmit={handleSubmit} className="update-specialization-form">
                            <div className="form-group">
                                <label htmlFor="specializationId">Specialization Name</label>
                                <input
                                    type="text"
                                    id="specializationId"
                                    name="Name"
                                    value={formData.Name} // Bind value to the Name field from formData
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="specializationDescription">Specialization Description</label>
                                <input
                                    type="text"
                                    id="specializationDescription"
                                    name="Description" // Use 'Description' as the name to match formData
                                    value={formData.Description} // Bind value to the Description field from formData
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <Button type="submit" className="button button-primary">
                                Update Specialization
                            </Button>
                        </form>
                    ) : (
                        <p>Loading specialization data...</p> // Show loading text until data is fetched
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UpdateSpecialization;
