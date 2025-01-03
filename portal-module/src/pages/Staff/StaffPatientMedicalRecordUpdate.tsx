import React, { useState, useEffect } from "react";
import { updatePatientMedicalRecord } from "../../services/PatientMedicalRecordService";
import { PatientMedicalRecordViewModel } from "../../viewModels/PatientMedicalRecordViewModel";
import { fetchAllAllergies } from "../../services/AllergyService";
import { fetchAllMedicalConditions } from "../../services/MedicalConditionsService";
import { PatientMedicalRecordUpdateDto } from "../../dtos/PatientMedicalRecordDto";
import { AllergyDto } from "../../dtos/AllergyDto";
import { MedicalConditionsDto } from "../../dtos/MedicalConditionsDto";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Buttons";
import Footer from "../../components/Footer/Footer";

const StaffPatientMedicalRecordUpdate: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedPatientMedicalRecord = location.state as PatientMedicalRecordViewModel;

    

    const [medicalRecordData, setMedicalRecordData] = useState<PatientMedicalRecordUpdateDto>({
        recordNumber: '',
        allergies: '',
        medicalConditions: '',
        fullName: '',
    });

    const [allergiesList, setAllergiesList] = useState<AllergyDto[]>([]);
    const [medicalConditionsList, setMedicalConditionsList] = useState<MedicalConditionsDto[]>([]);
    const [loading, setLoading] = useState(false);
    
    

    const handleUpdate = async () => {
        setLoading(true);

        try {
            const updatedMedicalRecord = await updatePatientMedicalRecord({
                recordNumber: selectedPatientMedicalRecord.recordNumber,
                allergies: medicalRecordData.allergies,
                medicalConditions: medicalRecordData.medicalConditions,
                fullName: medicalRecordData.fullName,
            });

            alert(`Medical record updated successfully: ${updatedMedicalRecord.recordNumber}`);
            navigate('/patientMedicalRecord');
        } catch (error) {
            console.error('Failed to update patient medical record:', error);
            alert('Failed to update patient medical record. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allergies = await fetchAllAllergies();
                setAllergiesList(allergies);

                const medicalConditions = await fetchAllMedicalConditions();
                setMedicalConditionsList(medicalConditions);

                const medicalRecord = JSON.parse(localStorage.getItem('medicalRecord')!);
                setMedicalRecordData(medicalRecord);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
        { id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel' },
        { id: 3, name: 'Manage Appointments', route: '/appointments' },
        { id: 4, name: 'Search Allergies', route: '/allergies' },
        { id: 5, name: 'Search Medical Conditions', route: '/medicalConditions' },
        { id: 6, name: 'Manage Patient Medical Record', route: '/patientMedicalRecord' },
    ];

    return (
        <div className="update-patient-medical-record-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Update Patient Medical Record</h1>
                    <div className="form-group">
                        <label> Full Name </label>
                        <input
                            type="text"
                            value={selectedPatientMedicalRecord.fullName}
                            readOnly
                            className="input-field"
                            title="Full Name"
                            placeholder="Full Name" />

                    <form onSubmit={handleUpdate}>
                        
                        <div className="mb-4">
                            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
                            <select
                                id="allergies"
                                name="allergies"
                                value={medicalRecordData.allergies}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select an Allergy</option>
                                {allergiesList.map((allergy) => (
                                    <option value={allergy.name}>{allergy.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700">Medical Conditions</label>
                            <select
                                id="medicalConditions"
                                name="medicalConditions"
                                value={medicalRecordData.medicalConditions}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a Medical Condition</option>
                                {medicalConditionsList.map((condition) => (
                                    <option value={condition.name}>{condition.name}</option>
                                ))}
                            </select>
                        </div>
                        <Button onClick={handleUpdate} className="button button-primary" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Patient Medical Record'}
                        </Button>
                    </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default StaffPatientMedicalRecordUpdate;
