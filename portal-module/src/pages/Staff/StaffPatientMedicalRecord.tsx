import React, { useState, useEffect } from "react";
import { fetchAllPatientMedicalRecord } from "../../services/PatientMedicalRecordService";
import { fetchPatient } from "../../services/PatientService"; // Add the fetchPatient service import
import { PatientMedicalRecordViewModel, mapPatientMedicalRecordDtoToViewModel } from "../../viewModels/PatientMedicalRecordViewModel";
import { useNavigate } from "react-router-dom";
import SelectableTable from "../../components/Table/SelectableTable";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Buttons";
import Footer from "../../components/Footer/Footer";

const StaffPatientMedicalRecords: React.FC = () => {
    const navigate = useNavigate();
    const [patientMedicalRecordList, setPatientMedicalRecordList] = useState<PatientMedicalRecordViewModel[]>([]);
    const [recordNumberToFullNameMap, setRecordNumberToFullNameMap] = useState<Record<string, string>>({});
    const [selectedPatientMedicalRecord, setSelectedPatientMedicalRecord] = useState<PatientMedicalRecordViewModel | null>(null);
    const [loading, setLoading] = useState(false);

    const loadPatientMedicalRecords = async () => {
        try {
            const patientMedicalRecordDtos = await fetchAllPatientMedicalRecord();
            const processedPatientMedicalRecords = patientMedicalRecordDtos.map(mapPatientMedicalRecordDtoToViewModel);

            // Fetch patient data to map recordNumber to fullName
            const patients = await fetchPatient({});
            const fullNameMap = patients.reduce((acc: Record<string, string>, patient: any) => {
                acc[patient.recordNumber] = patient.userId;
                return acc;
            }, {});

            setRecordNumberToFullNameMap(fullNameMap);
            setPatientMedicalRecordList(processedPatientMedicalRecords);
        } catch (error) {
            console.error("Error fetching patient medical records:", error);
            setPatientMedicalRecordList([]);
        }
    };

    useEffect(() => {
        loadPatientMedicalRecords();
    }, []);

    const handleUpdateMedicalCondition = () => {
        if (!selectedPatientMedicalRecord) {
            alert("No patient medical record selected.");
            return;
        }
        navigate(`/patientMedicalRecord/update/${selectedPatientMedicalRecord.recordNumber}`, { state: selectedPatientMedicalRecord });
    };

    const menuItems = [
        { id: 1, name: "Main Page", route: "/mainPageStaff" },
        { id: 2, name: "Operations Request", route: "/operationRequest" },
        { id: 3, name: "Surgery Room 3DModel", route: "/surgeryRoom3DModel" },
        { id: 3, name: "Manage Appointments", route: "/appointments" },
        { id: 4, name: "Search Allergies", route: "/allergies" },
        { id: 5, name: "Search Medical Conditions", route: "/medicalConditions" },
        { id: 6, name: "Manage Patient Medical Record", route: "/patientMedicalRecord" },
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Staff Patient Medical Record Page</h1>

                    <div className="table-container">
                        <SelectableTable
                            data={patientMedicalRecordList.map((record) => ({
                                ...record,
                                displayName: recordNumberToFullNameMap[record.recordNumber] || "Unknown", // Replace recordNumber with fullName
                                allergies: record.allergies, // Already a string in the ViewModel
                                medicalConditions: record.medicalConditions, // Already a string in the ViewModel
                            }))}
                            headers={[
                                { key: "displayName", label: "Full Name" }, // Show Full Name in the table
                                { key: "allergies", label: "Allergies" },
                                { key: "medicalConditions", label: "Medical Conditions" },
                            ]}
                            onRowSelect={setSelectedPatientMedicalRecord}
                        />
                    </div>

                    <div className="action-buttons">
                        <Button
                            onClick={handleUpdateMedicalCondition}
                            className="button button-primary"
                            disabled={!selectedPatientMedicalRecord}
                        >
                            Update Patient Medical Record
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StaffPatientMedicalRecords;
