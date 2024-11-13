import React, { useState, useEffect, useCallback } from 'react';
import { fetchLoggedInPatient, updatePatient, deletePatient } from '../services/PatientService';

const Patient: React.FC = () => {
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

    const handleUpdatePatient = async () => {
        if (!recordNumber) {
            alert("Record Number is required for updating your profile.");
            return;
        }
        try {
            await updatePatient({ ...patientData, recordNumber });
            alert('Profile updated successfully');
            loadPatient();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleDeletePatient = async (recordNumber: string) => {
        try {
            await deletePatient(recordNumber);
            alert('Profile deleted successfully');
        } catch (error) {
            console.error('Error deleting profile:', error);
            alert('Failed to delete profile');
        }
    };

    return (
        <div>
            <h1>Patient Information</h1>
            <p>Full Name: {patientData.fullName}</p>
            <p>Date of Birth: {patientData.dateOfBirth}</p>
            <p>Phone Number: {patientData.phoneNumber}</p>
            <p>Emergency Contact: {patientData.emergencyContact}</p>
            <p>Gender: {patientData.gender}</p>
            <p>User ID: {patientData.userId}</p>
            <p>First Name: {patientData.firstName}</p>
            <p>Last Name: {patientData.lastName}</p>

            <div>
                <h2>Update Patient</h2>
                <button onClick={handleUpdatePatient}>Update</button>
            </div>
            <div>
                <h2>Delete Account</h2>
                <input
                    type="text"
                    placeholder="Record Number"
                    value={recordNumber}
                    onChange={(e) => setRecordNumber(e.target.value)}
                />
                <button onClick={() => handleDeletePatient(recordNumber)}>Delete</button>
            </div>
        </div>
    );
};

export default Patient;