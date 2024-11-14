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
    const [editingField, setEditingField] = useState<string | null>(null);
    const [fieldValue, setFieldValue] = useState('');

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

    const handleEditClick = (field: string) => {
        setEditingField(field);
        setFieldValue(String(patientData[field as keyof typeof patientData] || ''));
    };
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(e.target.value);
    };

    const handleSaveField = () => {
        setPatientData(prevData => ({
            ...prevData,
            [editingField as keyof typeof patientData]: fieldValue,
        }));
        setEditingField(null);
    };

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

    const handleDeletePatient = async () => {
        if (!recordNumber) {
            alert("Record Number is required for deleting your profile.");
            return;
        }
        try {
            await deletePatient(recordNumber);
            alert('Profile deleted successfully');
        } catch (error) {
            console.error('Error deleting profile:', error);
            alert('Failed to delete profile');
        }
    };

    const renderField = (label: string, field: string) => (
        <div style={{ marginBottom: '10px' }}>
            <strong>{label}:</strong>
            {editingField === field ? (
                <>
                    <input
                        type="text"
                        value={fieldValue}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSaveField}>Save</button>
                </>
            ) : (
                <>
                    <span> {patientData[field as keyof typeof patientData]}</span>
                    <button onClick={() => handleEditClick(field)}>Edit</button>
                </>
            )}
        </div>
    );

    return (
        <div>
            <h1>Patient Information</h1>
            {renderField('Full Name', 'fullName')}
            {renderField('Date of Birth', 'dateOfBirth')}
            {renderField('Phone Number', 'phoneNumber')}
            {renderField('Emergency Contact', 'emergencyContact')}
            {renderField('Gender', 'gender')}
            {renderField('User ID', 'userId')}
            {renderField('First Name', 'firstName')}
            {renderField('Last Name', 'lastName')}

            <div>
                <h2>Update Patient</h2>
                <button onClick={handleUpdatePatient}>Update</button>
            </div>
            <div>
                <h2>Delete Account</h2>
                <button onClick={handleDeletePatient}>Delete Account</button>
            </div>
        </div>
    );
};

export default Patient;
