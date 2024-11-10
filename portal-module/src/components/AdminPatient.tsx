import React, { useState, useEffect, useCallback } from 'react';
import { fetchPatient, createPatient, updatePatient, markForDeletePatient, deletePatient } from '../services/PatientService';

const AdminPatient: React.FC = () => {
    const [patientList, setPatientList] = useState<any[]>([]);
    const [filter, setFilter] = useState({
        userId: '',
        phoneNumber: undefined as number | undefined,
        firstName: '',
        lastName: '',
        fullName: '',
        isToBeDeleted: '',
    });
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

    const loadPatient = useCallback(async () => {
        try {
            const data = await fetchPatient(filter);

            if (Array.isArray(data)) {
                setPatientList(data);
            } else {
                console.error('Expected patient list to be an array, received:', data);
                setPatientList([]);
            }
        } catch (error) {
            console.error('Error fetching patient:', error);
            setPatientList([]);
        }
    }, [filter]);

    useEffect(() => {
        loadPatient();
    }, [loadPatient]);

    const handleCreatePatient = async () => {
        try {
            await createPatient(patientData);
            alert('Patient created successfully');
            loadPatient();
        } catch (error) {
            console.error('Error creating patient:', error);
        }
    };

    const handleUpdatePatient = async () => {
        try {
            await updatePatient(patientData);
            alert('Patient updated successfully');
            loadPatient();
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };

    const handleMarkToDeletePatient = async (recordNumber: string) => {
        try {
            await markForDeletePatient(recordNumber);
            alert('Patient marked for deletion successfully');
            loadPatient();
        } catch (error) {
            console.error('Error marking patient for deletion:', error);
        }
    };

    const handleDeletePatient = async (recordNumber: string) => {
        try {
            await deletePatient(recordNumber);
            alert('Patient deleted successfully');
            loadPatient();
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    return (
        <div>
            <h1>Admin Patient Page</h1>
            <div>
                <h2>Filter Patients</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={filter.userId}
                    onChange={(e) => setFilter({ ...filter, userId: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Phone Number"
                    value={filter.phoneNumber}
                    onChange={(e) => setFilter({ ...filter, phoneNumber: parseInt(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={filter.firstName}
                    onChange={(e) => setFilter({ ...filter, firstName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={filter.lastName}
                    onChange={(e) => setFilter({ ...filter, lastName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={filter.fullName}
                    onChange={(e) => setFilter({ ...filter, fullName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Marked for Deletion"
                    value={filter.isToBeDeleted}
                    onChange={(e) => setFilter({ ...filter, isToBeDeleted: e.target.value })}
                />
                <button onClick={loadPatient}>Filter</button>
            </div>

            <div>
                <h2>Create or Update Patient</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={patientData.userId}
                    onChange={(e) => setPatientData({ ...patientData, userId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Date of Birth"
                    value={patientData.dateOfBirth}
                    onChange={(e) => setPatientData({ ...patientData, dateOfBirth: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Phone Number"
                    value={patientData.phoneNumber}
                    onChange={(e) => setPatientData({ ...patientData, phoneNumber: parseInt(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Emergency Contact"
                    value={patientData.emergencyContact}
                    onChange={(e) => setPatientData({ ...patientData, emergencyContact: parseInt(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Gender"
                    value={patientData.gender}
                    onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={patientData.firstName}
                    onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={patientData.lastName}
                    onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={patientData.fullName}
                    onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                />
                <button onClick={handleCreatePatient}>Create</button>
                <button onClick={handleUpdatePatient}>Update</button>
            </div>

            <div>
                <h2>Patient List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Record Number</th>
                            <th>Date of Birth</th>
                            <th>Phone Number</th>
                            <th>Emergency Contact</th>
                            <th>Marked for Deletion</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientList.map((patient) => (
                            <tr key={patient.recordNumber}>
                                <td>{patient.recordNumber}</td>
                                <td>{new Date(patient.dateOfBirth).toLocaleDateString('en-CA')}</td>
                                <td>{patient.phoneNumber}</td>
                                <td>{patient.emergencyContact}</td>
                                <td>{patient.isToBeDeleted ? "Yes" : "No"}</td>
                                <td>
                                    <button onClick={() => markForDeletePatient(patient.recordNumber)}>Mark To Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPatient;
