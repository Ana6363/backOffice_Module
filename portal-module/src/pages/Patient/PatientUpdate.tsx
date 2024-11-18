import React, { useState, useEffect, useCallback } from 'react';
import { updatePatient, fetchLoggedInPatient } from '../../services/PatientService';
import Button from '../../components/Buttons/Buttons';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './UpdatePatient.css';  // Make sure the styles are consistent with your setup

const UpdatePatient: React.FC = () => {
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

  const handleSaveChanges = async () => {
    try {
      await updatePatient(patientData);
      alert('Profile updated successfully');
      navigate('/mainPagePatient'); // Navigate after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const menuItems = [
    { id: 1, name: 'Main Page', route: '/mainPagePatient' },
    { id: 2, name: 'My Account', route: '/patient' },
    { id: 3, name: 'Update Account', route: '/patient/update' },
    { id: 4, name: 'Delete Account', route: '/patient/delete' },
  ];

  return (
    <div className="app-wrapper"> {/* Ensure full-page layout */}
      <Navbar menuItemsProp={menuItems} />
      <main className="main-content"> {/* Main content to push footer down */}
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Update Profile</h1>

          <div className="mb-4">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={patientData.phoneNumber}
              onChange={(e) => setPatientData({ ...patientData, phoneNumber: Number(e.target.value) })}
              className="input input-bordered w-full mb-2"
            />
          </div>

          <div className="mb-4">
            <label>Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={patientData.emergencyContact}
              onChange={(e) => setPatientData({ ...patientData, emergencyContact: Number(e.target.value) })}
              className="input input-bordered w-full mb-2"
            />
          </div>

          <div className="mb-4">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </div>
      </main>

      <Footer /> {/* Footer will be at the bottom */}
    </div>
  );
};

export default UpdatePatient;
