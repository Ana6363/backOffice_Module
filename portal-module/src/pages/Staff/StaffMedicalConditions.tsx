import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import SelectableTable from "../../components/Table/SelectableTable";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Buttons";
import Footer from "../../components/Footer/Footer";
import {fetchAllMedicalConditions} from "../../services/MedicalConditionsService";
import {MedicalConditionsViewModel, mapMedicalConditionsDtoToViewModel} from "../../viewModels/MedicalConditionsViewModel";


const StaffMedicalConditions: React.FC = () => {
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
            <Navbar menuItemsProp={menuItems}/>
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Staff Medical Conditions Page</h1>

                    <div className="table-container">
                        <SelectableTable
                            data={medicalConditionsList}
                            headers={[
                                {key: 'title', label: 'Name'},
                                {key: 'description', label: 'Description'},
                            ]}
                            onRowSelect={setSelectedMedicalCondition}
                            disableRowSelection={true}
                        />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default StaffMedicalConditions;