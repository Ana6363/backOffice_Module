import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateMedicalConditions, fetchMedicalCondition } from '../../../services/MedicalConditionsService';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';

const UpdateMedicalConditions: React.FC = () => {
    const navigate = useNavigate();
    const { name } = useParams<{ name: string }>(); // Use useParams to get the name from the route parameter

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedicalConditionData = async () => {
            try {
                if (name) {
                    const condition = await fetchMedicalCondition(name); // Fetch specific medical condition
                    setFormData({
                        name: condition.name,
                        description: condition.description,
                    });
                } else {
                    console.error("No medical condition name provided");
                    alert("No medical condition name provided");
                    navigate('/admin/medicalConditions');
                }
            } catch (error) {
                console.error("Error fetching medical condition:", error);
                alert("Error fetching medical condition");
                navigate('/admin/medicalConditions');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicalConditionData();
    }, [name, navigate]);

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
            await updateMedicalConditions(formData); // Send updated medical condition data
            alert("Medical condition updated successfully");
            navigate('/admin/medicalConditions'); // Redirect to the medical conditions list page
        } catch (error) {
            console.error("Error updating medical condition:", error);
            alert("Error updating medical condition");
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
        { id: 9, name: 'Manage Allergies', route: '/admin/allergies' },
        { id: 10, name: 'Manage Medical Conditions', route: '/admin/medicalConditions' },
    ];

    return (
        <div className="update-medical-condition-wrapper">
            <Navbar menuItemsProp={menuItems} /> {/* Add Navbar with menu items here */}
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Update Medical Condition</h1>

                    {loading ? (
                        <p>Loading medical condition data...</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="update-medical-condition-form">
                            <div className="form-group">
                                <label htmlFor="name">Condition Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <Button onClick={() => handleSubmit({} as React.FormEvent)} className="button button-primary">
                                Update Condition
                            </Button>
                        </form>
                    )}
                </div>
            </main>
            <Footer /> {/* Add Footer here */}
        </div>
    );
};

export default UpdateMedicalConditions;
