import React, { useState, useEffect } from 'react';
import { fetchAllAllergies } from '../../../services/AllergyService';
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

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' },
        { id: 5, name: 'Schedule Surgeries', route: '/admin/schedule' },
        { id: 6, name: 'Manage Surgery Rooms', route: '/admin/surgeries' },
        { id: 7, name: 'Manage Specializations', route: '/admin/specializations' },
        { id: 8, name: 'Manage Room Types', route: '/admin/roomtypes' },
        { id: 9, name: 'Manage Allergies', route: '/admin/allergies' }
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
                                { key: 'title', label: 'Name' },
                                { key: 'description', label: 'Description' },
                            ]}
                            onRowSelect={setSelectedAllergy}
                        />
                    </div>

                    <div className="action-buttons">
                        <Button onClick={handleCreateAllergy} className="button button-primary">
                            Create Allergy
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminAllergy;
