import React, { useState, useEffect, useCallback } from 'react';
import { deletePatient, fetchLoggedInPatient } from '../../services/PatientService';
import './PatientPage.css';
import Button from '../../components/Buttons/Buttons';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/PopUp';
import Footer from '../../components/Footer/Footer';

const DeletePatient: React.FC = () => {
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

  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const loadPatient = useCallback(async () => {
    try {
      const data = await fetchLoggedInPatient();
      if (data) {
        setPatientData(data);
        console.log("Patient data loaded:", data); // Debug log
      } else {
        console.error("No patient data found");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  }, []);

  useEffect(() => {
    loadPatient();
  }, [loadPatient]);

  const handleDeletePatient = async () => {
    console.log("handleDeletePatient called"); // Debug log
    console.log("Record Number:", patientData.recordNumber); // Debug log

    if (!patientData.recordNumber) {
      alert("Record number is missing.");
      return;
    }

    try {
      await deletePatient(patientData.recordNumber);
      alert("Account deleted successfully!");
      navigate('/login');
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar menuItemsProp={[
        { id: 1, name: 'Main Page', route: '/mainPagePatient' },
        { id: 2, name: 'My Account', route: '/patient' },
        { id: 3, name: 'Update Account', route: '/patient/update' },
        { id: 4, name: 'Delete Account', route: '/patient/delete' },
      ]} />
      <main className="main-content">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Confirm Delete</h1>
          <p>Are you sure you want to delete your profile?</p>
          <Button
            onClick={() => {
              console.log("Delete button clicked"); // Debug log
              setModalOpen(true);
            }}
          >
            Confirm Delete
          </Button>
          <Button onClick={() => navigate('/')}>Cancel</Button>
        </div>

        {isModalOpen && (
          <Modal
            title="Confirm Deletion"
            message="Are you sure you want to delete your profile? This action cannot be undone."
            onClose={() => {
              console.log("Modal closed"); // Debug log
              setModalOpen(false);
            }}
            onConfirm={() => {
              console.log("Modal confirm clicked"); // Debug log
              setModalOpen(false);
              handleDeletePatient();
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DeletePatient;
