import React, {useState, useEffect} from "react";
import {fetchPatientMedicalRecord} from "../../services/PatientMedicalRecordService";
import {PatientMedicalRecordViewModel, mapPatientMedicalRecordDtoToViewModel} from "../../viewModels/PatientMedicalRecordViewModel";
import {useNavigate} from "react-router-dom";
import SelectableTable from "../../components/Table/SelectableTable";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Buttons";
import Footer from "../../components/Footer/Footer";


const StaffPatientMedicalRecords: React.FC = () => {
    const navigate = useNavigate();
    const [patientMedicalRecordList, setPatientMedicalRecordList] = useState<PatientMedicalRecordViewModel[]>([]);
    const [selectedPatientMedicalRecord, setSelectedPatientMedicalRecord] = useState<PatientMedicalRecordViewModel | null>(null);

    const loadPatientMedicalRecords = async () => {
        try {
            const patientMedicalRecordDtos = await fetchPatientMedicalRecord();
            const processedPatientMedicalRecords = Array.isArray(patientMedicalRecordDtos) 
                ? patientMedicalRecordDtos.map(mapPatientMedicalRecordDtoToViewModel) 
                : [];
            setPatientMedicalRecordList(processedPatientMedicalRecords);
        } catch (error) {
            console.error('Error fetching patient medical records:', error);
            setPatientMedicalRecordList([]);
        }
    };

    useEffect(() => {
        loadPatientMedicalRecords();
    }, []);

    const handleNavigateToUpdate = () => {
        if (selectedPatientMedicalRecord) {
            navigate(`/patientMedicalRecord/${selectedPatientMedicalRecord.recordNumber}`);
        }
    };




    const menuItems = [
        {id: 1, name: 'Main Page', route: '/mainPageStaff'},
        {id: 2, name: 'Operations Request', route: '/operationRequest'},
        {id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel'},
        {id: 3, name: 'Manage Appointments', route: '/appointments'},
        {id: 4, name: 'Search Allergies', route: '/allergies'},
        {id: 5, name: 'Search Medical Conditions', route: '/medicalConditions'},
        {id: 6, name: 'Manage Patient Medical Record', route: '/patientMedicalRecord'}
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems}/>
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Staff Patient Medical Record Page</h1>

                    <div className="table-container">
                        <SelectableTable
                            data={patientMedicalRecordList}
                            headers={[
                                {key: 'recordNumber', label: 'Record Number'},
                                {key: 'allergies', label: 'Allergies'},
                                {key: 'medicalConditions', label: 'Medical Conditions'},
                                {key: 'fullName', label: 'Full Name'},
                            ]}

                            onRowSelect={setSelectedPatientMedicalRecord}
                            disableRowSelection={true}
                        />
                    </div>

                    <div className="action-buttons">
                        <Button onClick={handleNavigateToUpdate}>Update Patient Medical Record</Button>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default StaffPatientMedicalRecords;