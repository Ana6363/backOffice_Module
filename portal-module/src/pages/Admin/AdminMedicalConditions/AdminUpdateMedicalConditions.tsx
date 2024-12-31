import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateMedicalConditions, fetchMedicalCondition } from '../../../services/MedicalConditionsService';
import Button from '../../../components/Buttons/Buttons';
import { MedicalConditionsViewModel } from '../../../viewModels/MedicalConditionsViewModel';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';

const UpdateMedicalConditions: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedMedicalCondition = location.state as MedicalConditionsViewModel;

    const [description, setDescription] = useState(selectedMedicalCondition.description);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const updatedMedicalCondition = await updateMedicalConditions({
                name: selectedMedicalCondition.name,
                description,
            });
            alert(`Medical condition updated successfully: ${updatedMedicalCondition.name}`);
            navigate('/admin/medicalConditions');
        } catch (error) {
            console.error('Failed to update medical condition:', error);
            alert('Failed to update medical condition. Please try again.');
        } finally {
            setLoading(false);
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
                        <><div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={selectedMedicalCondition.name}
                                    readOnly
                                    className="input-field" />
                            </div><div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="input-field" />
                                </div><div className="form-actions">
                                    <Button onClick={handleUpdate} className="button button-primary" disabled={loading}>
                                        {loading ? 'Updating...' : 'Update Allergy'}
                                    </Button>
                                </div></>
                    

                </div>
            </main>
            <Footer /> {/* Add Footer here */}
        </div>
    );
};

export default UpdateMedicalConditions;
