import React, { useState, useEffect } from "react";
import { updatePatientMedicalRecord } from "../../services/PatientMedicalRecordService";
import { fetchAllAllergies } from "../../services/AllergyService";
import { fetchAllMedicalConditions } from "../../services/MedicalConditionsService";
import { PatientMedicalRecordUpdateDto } from "../../dtos/PatientMedicalRecordDto";
import { AllergyDto } from "../../dtos/AllergyDto";
import { MedicalConditionsDto } from "../../dtos/MedicalConditionsDto";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Buttons";
import Footer from "../../components/Footer/Footer";

const StaffPatientMedicalRecordUpdate: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [medicalRecordData, setMedicalRecordData] = useState<PatientMedicalRecordUpdateDto>({
        recordNumber: '',
        allergies: '',
        medicalConditions: '',
        fullName: '',
    });

    const [allergiesList, setAllergiesList] = useState<AllergyDto[]>([]);
    const [medicalConditionsList, setMedicalConditionsList] = useState<MedicalConditionsDto[]>([]);

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMedicalRecordData({
            ...medicalRecordData,
            [name]: value,
        });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            if (!medicalRecordData.recordNumber || !medicalRecordData.allergies || !medicalRecordData.medicalConditions || !medicalRecordData.fullName) {
                setError('Please fill in all fields.');
                return;
            }

            await updatePatientMedicalRecord(medicalRecordData);
            alert('Patient Medical Record updated successfully!');
            navigate('/patientMedicalRecord');
        } catch (error) {
            console.error('Error updating patient medical record:', error);
            setError('Error updating patient medical record. Please try again.');
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
                setError('Failed to fetch initial data.');
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
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Update Patient Medical Record</h1>

                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="recordNumber" className="block text-sm font-medium text-gray-700">Record Number</label>
                            <input
                                type="number"
                                id="recordNumber"
                                name="recordNumber"
                                value={medicalRecordData.recordNumber}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
                            <select
                                id="allergies"
                                name="allergies"
                                value={medicalRecordData.allergies}
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a Medical Condition</option>
                                {medicalConditionsList.map((condition) => (
                                    <option value={condition.name}>{condition.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={medicalRecordData.fullName}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <Button type="submit" className="button button-primary">Update Medical Record</Button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default StaffPatientMedicalRecordUpdate;
