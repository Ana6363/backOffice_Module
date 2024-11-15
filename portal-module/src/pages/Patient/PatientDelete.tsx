import React, { useState, useEffect, useCallback } from 'react';
import { deletePatient, fetchLoggedInPatient } from '../../services/PatientService';
import Button from '../../components/Buttons';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/PopUp'; // Import Modal component
import Footer from '../../components/Footer';

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
      if (data) setPatientData(data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }, []);

  useEffect(() => {
    loadPatient();
  }, [loadPatient]);

  const handleDeletePatient = async () => {
    try {
      await deletePatient(patientData.recordNumber);
      alert('Patient deletion scheduled in 24h');
      navigate('/'); // Redirect after delete
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Confirm Delete</h1>
        <p>Are you sure you want to delete your profile?</p>

        <div className="flex justify-between mt-4">
          <Button onClick={() => setModalOpen(true)}>Confirm Delete</Button>
          <Button onClick={() => navigate('/')}>Cancel</Button>
        </div>
      </div>

      {/* Modal for Confirmation */}
      {isModalOpen && (
        <Modal
          title="Confirm Deletion"
          message="Are you sure you want to delete your profile? This action cannot be undone."
          onClose={() => setModalOpen(false)}
          onConfirm={handleDeletePatient}
        />
      )}

      <Footer />
    </div>
  );
};

export default DeletePatient;
