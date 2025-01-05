import React, { useState, useEffect } from "react";
import { updatePatientMedicalRecord } from "../../services/PatientMedicalRecordService";
import { PatientMedicalRecordViewModel } from "../../viewModels/PatientMedicalRecordViewModel";
import { fetchAllAllergies } from "../../services/AllergyService";
import { fetchAllMedicalConditions } from "../../services/MedicalConditionsService";
import { AllergyDto } from "../../dtos/AllergyDto";
import { MedicalConditionsDto } from "../../dtos/MedicalConditionsDto";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Buttons";
import Footer from "../../components/Footer/Footer";
import { PatientMedicalRecordsDto } from "../../dtos/PatientMedicalRecordDto";

const StaffPatientMedicalRecordUpdate: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedPatientMedicalRecord = location.state as PatientMedicalRecordViewModel;

    

    const [medicalRecordData, setMedicalRecordData] = useState<PatientMedicalRecordsDto | null>(
        location.state ? {
            recordNumber: location.state.recordNumber || '',
            allergies: { $values: location.state.allergies?.split(", ") || [] },
            medicalConditions: { $values: location.state.medicalConditions?.split(", ") || [] },
        } : null
    );
    
    useEffect(() => {
        if (!location.state) {
            console.error("No location.state found. Redirecting back to list page.");
            alert("No medical record selected. Redirecting to list page.");
            navigate('/patientMedicalRecord');
        }
    }, [location.state, navigate]);
    
    
    const [allergiesList, setAllergiesList] = useState<AllergyDto[]>([]);
    const [medicalConditionsList, setMedicalConditionsList] = useState<MedicalConditionsDto[]>([]);
    const [loading, setLoading] = useState(false);
    
    

    const handleUpdate = async () => {
        if (!medicalRecordData) {
            console.error("Cannot update: medicalRecordData is null.");
            alert("No medical record data found. Please ensure all required fields are filled.");
            return;
        }
    
        setLoading(true);
    
        try {
            const updatedMedicalRecord = await updatePatientMedicalRecord({
                recordNumber: selectedPatientMedicalRecord.recordNumber,
                allergies: medicalRecordData.allergies,
                medicalConditions: medicalRecordData.medicalConditions,
            });
    
            console.log("Successfully updated medical record:", updatedMedicalRecord);
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
    
                // Check for medicalRecord in localStorage
                const medicalRecordString = localStorage.getItem('medicalRecord');
                console.log("Retrieved medical record from localStorage:", medicalRecordString);
    
                if (medicalRecordString) {
                    const medicalRecord = JSON.parse(medicalRecordString);
                    setMedicalRecordData(medicalRecord);
                    console.log("Parsed medical record:", medicalRecord);
                } else {
                    console.warn('No medical record found in localStorage');
                }
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

                    <form onSubmit={handleUpdate}>
                        
                    <div className="mb-4">
    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
    <select
        id="allergies"
        name="allergies"
        value={medicalRecordData?.allergies?.$values[0] || ''}
        onChange={(e) =>
            setMedicalRecordData((prev) => ({
                ...prev!,
                allergies: { $values: [e.target.value] },
            }))
        }
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
        <option value="">Select an Allergy</option>
        {allergiesList.map((allergy) => (
            <option key={allergy.name} value={allergy.name}>
                {allergy.name}
            </option>
        ))}
    </select>
</div>

<div className="mb-4">
    <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700">Medical Conditions</label>
    <select
        id="medicalConditions"
        name="medicalConditions"
        value={medicalRecordData?.medicalConditions?.$values[0] || ''}
        onChange={(e) =>
            setMedicalRecordData((prev) => ({
                ...prev!,
                medicalConditions: { $values: [e.target.value] },
            }))
        }
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
        <option value="">Select a Medical Condition</option>
        {medicalConditionsList.map((condition) => (
            <option key={condition.name} value={condition.name}>
                {condition.name}
            </option>
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
