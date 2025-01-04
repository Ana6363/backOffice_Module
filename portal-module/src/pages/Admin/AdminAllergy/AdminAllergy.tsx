import React, { useState, useEffect } from 'react';
import { fetchAllAllergies, deleteAllergy} from '../../../services/AllergyService';
import { AllergyViewModel, mapAllergyDtoToViewModel } from '../../../viewModels/AllergyViewModel';
import { useNavigate } from 'react-router-dom';
import SelectableTable from '../../../components/Table/SelectableTable';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';

const AdminAllergy: React.FC = () => {
    const navigate = useNavigate();
    const [allergyList, setAllergyList] = useState<AllergyViewModel[]>([]);
    const [selectedAllergy, setSelectedAllergy] = useState<AllergyViewModel | null>(null);
    const [loading, setLoading] = useState(false);

    const loadAllergies = async () => {
        try {
            const allergyDtos = await fetchAllAllergies();
            const processedAllergies = allergyDtos.map(mapAllergyDtoToViewModel);
            setAllergyList(processedAllergies);
        } catch (error) {
            console.error('Error fetching allergies:', error);
            setAllergyList([]);
        }
    };

    useEffect(() => {
        loadAllergies();
    }, []);

    const handleCreateAllergy = () => {
        navigate('/admin/createAllergy');
    };

    const handleUpdateAllergy = () => {
        if (selectedAllergy) {
            navigate(`/admin/updateAllergy/${selectedAllergy.name}`, { state: selectedAllergy });
        }
    };

    const handleDeleteAllergy = async () => {
        if (selectedAllergy) {
            const confirmDelete = window.confirm(
                `Are you sure you want to delete the allergy "${selectedAllergy.name}"?`
            );
            if (!confirmDelete) return;

            setLoading(true);
            try {
                await deleteAllergy(selectedAllergy.name);
                alert(`Allergy "${selectedAllergy.name}" deleted successfully.`);
                setSelectedAllergy(null); // Reset selection
                await loadAllergies(); // Reload the allergy list
            } catch (error) {
                console.error('Failed to delete allergy:', error);
                alert('Failed to delete allergy. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 9, name: 'Manage Allergies', route: '/admin/allergies' },
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Admin Allergy Page</h1>

                    <div className="table-container">
                        <SelectableTable
                            data={allergyList}
                            headers={[
                                { key: 'name', label: 'Name' },
                                { key: 'description', label: 'Description' },
                            ]}
                            onRowSelect={setSelectedAllergy}
                        />
                    </div>

                    <div className="action-buttons">
                        <Button onClick={handleCreateAllergy} className="button button-primary">
                            Create Allergy
                        </Button>
                        <Button
                            onClick={handleUpdateAllergy}
                            className="button button-secondary"
                            disabled={!selectedAllergy || loading}
                        >
                            Update Allergy
                        </Button>
                        <Button
                            onClick={handleDeleteAllergy}
                            className="button button-danger"
                            disabled={!selectedAllergy || loading}
                        >
                            {loading ? 'Deleting...' : 'Delete Allergy'}
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminAllergy;
