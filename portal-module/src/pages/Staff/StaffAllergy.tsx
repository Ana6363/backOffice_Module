import React, { useState, useEffect } from 'react';
import { fetchAllAllergies } from '../../services/AllergyService';
import { AllergyViewModel, mapAllergyDtoToViewModel } from '../../viewModels/AllergyViewModel';
import { useNavigate } from 'react-router-dom';
import SelectableTable from '../../components/Table/SelectableTable';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Buttons/Buttons';
import Footer from '../../components/Footer/Footer';

const StaffAllergy: React.FC = () => {
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

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
        { id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel' },
        { id: 3, name: 'Manage Appointments', route: '/appointments' },
        { id: 4, name: 'Search Allergies', route: '/allergies' },
        { id: 5, name: 'Search Medical Conditions', route: '/medicalConditions' },
        { id: 6, name: 'Manage Patient Medical Record', route: '/patientMedicalRecord' }
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
                            disableRowSelection={true}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StaffAllergy;
