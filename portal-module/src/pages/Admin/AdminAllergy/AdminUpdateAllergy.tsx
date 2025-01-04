import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AllergyViewModel } from '../../../viewModels/AllergyViewModel';
import { UpdateAllergy } from '../../../services/AllergyService';
import Button from '../../../components/Buttons/Buttons';

const UpdateAllergyPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get the selected allergy from the location state
    const selectedAllergy = location.state as AllergyViewModel;

    const [description, setDescription] = useState(selectedAllergy.description);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const updatedAllergy = await UpdateAllergy({
                name: selectedAllergy.name,
                description,
            });
            alert(`Allergy updated successfully: ${updatedAllergy.name}`);
            navigate('/admin/allergies');
        } catch (error) {
            console.error('Failed to update allergy:', error);
            alert('Failed to update allergy. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="text-3xl font-bold text-center mb-8">Update Allergy</h1>
            <div className="form-container">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={selectedAllergy.name}
                        readOnly
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="form-actions">
                    <Button onClick={handleUpdate} className="button button-primary" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Allergy'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateAllergyPage;
