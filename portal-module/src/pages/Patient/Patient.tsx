import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLoggedInPatient } from '../../services/PatientService';
import Button from '../../components/Buttons/Buttons'; 
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { downloadPatientMedicalRecord } from '../../services/PatientMedicalRecordService';

const Patient: React.FC = () => {
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState({
        dateOfBirth: '',
        phoneNumber: 0,
        emergencyContact: 0,
        gender: '',
        userId: '',
        firstName: '',
        lastName: '',
        fullName: '',
    });
    const [recordNumber, setRecordNumber] = useState('');

    const loadPatient = useCallback(async () => {
        try {
            const data = await fetchLoggedInPatient();
            if (data) {
                setPatientData(data);
                setRecordNumber(data.recordNumber); // Assuming recordNumber is part of patientData
            } else {
                console.error('Expected patient data, received:', data);
                setPatientData({
                    dateOfBirth: '',
                    phoneNumber: 0,
                    emergencyContact: 0,
                    gender: '',
                    userId: '',
                    firstName: '',
                    lastName: '',
                    fullName: '',
                });
            }
        } catch (error) {
            console.error('Error fetching patient:', error);
            setPatientData({
                dateOfBirth: '',
                phoneNumber: 0,
                emergencyContact: 0,
                gender: '',
                userId: '',
                firstName: '',
                lastName: '',
                fullName: '',
            });
        }
    }, []);

    useEffect(() => {
        loadPatient();
    }, [loadPatient]);

    const handleNavigateToUpdate = () => {
        navigate('/patient/update'); // Navigate to the update page
    };

    const handleNavigateToDelete = () => {
        navigate('/patient/delete'); // Navigate to the delete page
    };

    const handleDownload = async () => {
        try {
            await downloadPatientMedicalRecord(recordNumber); 
            console.log('Download iniciado com sucesso!');
        } catch (error) {
            console.error('Erro ao iniciar o download:', error);
        }
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPagePatient' },
        { id: 2, name: 'My Account', route: '/patient' },
        { id: 3, name: 'Update Account', route: '/patient/update' },
        { id: 4, name: 'Delete Account', route: '/patient/delete' },
        { id: 5, name: 'Privacy Policy', route: '/privacyPolicy' },
      ];

    return (
        <div className="app-wrapper"> {/* Ensure full-page layout */}
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold text-center mb-8">Patient Information</h1>

                    {/* Patient Information Container with extra padding */}
                    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Full Name */}
                            <div>
                                <strong className="text-lg block mb-2">Full Name:</strong>
                                <p>{patientData.fullName}</p>
                            </div>

                            {/* First Name */}
                            <div>
                                <strong className="text-lg block mb-2">First Name:</strong>
                                <p>{patientData.firstName}</p>
                            </div>

                            {/* Last Name */}
                            <div>
                                <strong className="text-lg block mb-2">Last Name:</strong>
                                <p>{patientData.lastName}</p>
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <strong className="text-lg block mb-2">Date of Birth:</strong>
                                <p>{patientData.dateOfBirth}</p>
                            </div>

                            {/* Gender */}
                            <div>
                                <strong className="text-lg block mb-2">Gender:</strong>
                                <p>{patientData.gender}</p>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <strong className="text-lg block mb-2">Phone Number:</strong>
                                <p>{patientData.phoneNumber}</p>
                            </div>

                            {/* Emergency Contact */}
                            <div>
                                <strong className="text-lg block mb-2">Emergency Contact:</strong>
                                <p>{patientData.emergencyContact}</p>
                            </div>

                            {/* Email (User ID) */}
                            <div>
                                <strong className="text-lg block mb-2">Email:</strong>
                                <p>{patientData.userId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-center gap-6 mt-6">
                        <Button
                            onClick={handleNavigateToUpdate}
                            className="btn-primary w-42 text-sm py-2 hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out rounded-xl"
                        >
                            Update Profile
                        </Button>
                        <Button
                            onClick={handleNavigateToDelete}
                            className="btn-danger w-42 text-sm py-2 hover:bg-red-700 hover:scale-105 transition-all duration-300 ease-in-out rounded-xl"
                        >
                            Delete Account
                        </Button>
                        <Button
                            onClick={handleDownload} 
                            className="btn-success w-42 text-sm py-2 hover:bg-green-700 hover:scale-105 transition-all duration-300 ease-in-out rounded-xl"
                        >
                            Download Medical Record
                        </Button>
                    </div>
                </div>
            </main>
            <Footer /> {/* Footer at the bottom */}
        </div>
    );
};

export default Patient;
