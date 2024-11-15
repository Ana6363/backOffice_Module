import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLoggedInPatient } from '../../services/PatientService'; // Make sure this service is fetching data correctly
import Button from '../../components/Buttons';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
    recordNumber: '',
  });

  const navigate = useNavigate();

  // Fetch logged-in patient's data
  const loadPatient = useCallback(async () => {
    try {
      const data = await fetchLoggedInPatient();
      if (data) {
        setPatientData(data);
      } else {
        console.error('No patient data found');
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }, []);

  useEffect(() => {
    loadPatient();
  }, [loadPatient]);

  const handleEdit = () => {
    // Navigate to UpdatePatient page with the patient's record number (to be used for update)
    navigate('/update-patient');
  };

  const handleDelete = () => {
    // Navigate to DeletePatient page with the patient's record number (to be used for deletion)
    navigate('/delete-patient');
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>
        <p><strong>Name:</strong> {patientData.fullName}</p>
        <p><strong>Email:</strong> {patientData.firstName} {patientData.lastName}</p>
        <p><strong>Phone Number:</strong> {patientData.phoneNumber}</p>
        <p><strong>Emergency Contact:</strong> {patientData.emergencyContact}</p>

        {/* Buttons to navigate to Update or Delete pages */}
        <div className="flex justify-between mt-4">
          <Button onClick={handleEdit}>Edit Profile</Button>
          <Button onClick={handleDelete}>Delete Profile</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Patient;
