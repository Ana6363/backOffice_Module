import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectableTable from "../../../components/Table/SelectableTable";
import Navbar from "../../../components/Navbar/Navbar";
import Button from "../../../components/Buttons/Buttons";
import Footer from "../../../components/Footer/Footer";
import { fetchAllMedicalConditions } from "../../../services/MedicalConditionsService";
import { MedicalConditionsViewModel, mapMedicalConditionsDtoToViewModel } from "../../../viewModels/MedicalConditionsViewModel";

const AdminMedicalConditions: React.FC = () => {
    const navigate = useNavigate();
    const [medicalConditionsList, setMedicalConditionsList] = useState<MedicalConditionsViewModel[]>([]);
    const [selectedMedicalCondition, setSelectedMedicalCondition] = useState<MedicalConditionsViewModel | null>(null);

    const loadMedicalConditions = async () => {
        try {
            const medicalConditionsDtos = await fetchAllMedicalConditions();
            const processedMedicalConditions = medicalConditionsDtos.map(mapMedicalConditionsDtoToViewModel);
            setMedicalConditionsList(processedMedicalConditions);
        } catch (error) {
            console.error('Error fetching medical conditions:', error);
            setMedicalConditionsList([]);
        }
    };

    useEffect(() => {
        loadMedicalConditions();
    }, []);

    const handleCreateMedicalCondition = () => {
        navigate('/admin/createMedicalCondition');
    };

    const handleUpdateMedicalCondition = () => {
        if (!selectedMedicalCondition) {
            alert("No medical condition selected.");
            return;
        }
        navigate(`/admin/updateMedicalCondition/${selectedMedicalCondition.title}`);
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
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Admin Medical Conditions Page</h1>

                    <div className="table-container">
                        <SelectableTable
                            data={medicalConditionsList}
                            headers={[
                                { key: 'title', label: 'Name' },
                                { key: 'description', label: 'Description' },
                            ]}
                            onRowSelect={setSelectedMedicalCondition}
                        />
                    </div>

                    <div className="action-buttons">
                        <Button onClick={handleCreateMedicalCondition} className="button button-primary">
                            Create Medical Condition
                        </Button>
                        <Button
                            onClick={handleUpdateMedicalCondition}
                            disabled={!selectedMedicalCondition}
                            className="button button-primary"
                        >
                            Update Medical Condition
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminMedicalConditions;
