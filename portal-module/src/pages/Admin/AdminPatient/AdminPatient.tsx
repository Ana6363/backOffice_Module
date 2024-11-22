import React, { useState, useEffect, useCallback } from 'react';
import { fetchPatient, createPatient, updatePatient, markForDeletePatient, deletePatient } from '../../../services/PatientService';
import { useNavigate } from 'react-router-dom';
import SelectableTable from '../../../components/Table/SelectableTable';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import './Patient.css';

const AdminPatient: React.FC = () => {
    const navigate = useNavigate();

    const [patientList, setPatientList] = useState<any[]>([]);
    const [filter, setFilter] = useState({
        userId: '',
        phoneNumber: '',
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
    const [recordNumber, setRecordNumber] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<any | null>(null); // New state for selected patient
    const [modalContent, setModalContent] = useState({
      title: '',
      message: '',
      action: () => {},
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
        navigate('/admin/patient/create');  
    };
    

    const handleUpdatePatient = async () => {
        if (!selectedPatient) {
            alert("No patient selected.");
            return;
        }
        navigate(`/admin/patient/update/${selectedPatient.phoneNumber}`);
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
            alert('Patient deletion schedule in 24h');
            loadPatient();
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const openModal = (title: string, message: string, action: () => void) => {
        setModalContent({ title, message, action });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteOrMark = () => {
        if (selectedPatient) {
            const action = selectedPatient.isToBeDeleted
                ? () => handleDeletePatient(selectedPatient.recordNumber)
                : () => handleMarkToDeletePatient(selectedPatient.recordNumber);

            openModal(
                selectedPatient.isToBeDeleted ? 'Delete Patient' : 'Mark for Deletion',
                `Are you sure you want to ${
                    selectedPatient.isToBeDeleted ? 'delete' : 'mark for deletion'
                } this patient?`,
                action
            );
        }
    };
    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: 'opTypes' },
    ];
  

    return (
        <div className="app-wrapper">
          <Navbar menuItemsProp={menuItems} />
          <main className="main-content">
            <div className="container">
              <h1 className="text-3xl font-bold text-center mb-8">Admin Patient Page</h1>
    
              {/* Table Container */}
              <div className="table-container">
                <SelectableTable
                  data={patientList}
                  headers={[
                    { key: 'userId', label: 'Email (User ID)' },
                    { key: 'dateOfBirth', label: 'Date of Birth' },
                    { key: 'phoneNumber', label: 'Phone Number' },
                    { key: 'emergencyContact', label: 'Emergency Contact' },
                    { key: 'isToBeDeleted', label: 'Marked for Deletion' },
                  ]}
                  onRowSelect={setSelectedPatient}
                />
              </div>
    
              {/* Action Buttons */}
              <div className="action-buttons">
                <Button onClick={handleCreatePatient} className="button button-primary">
                  Create Patient
                </Button>
                <Button onClick={handleUpdatePatient} disabled={!selectedPatient} className="button button-primary">
                  Update Patient
                </Button>
                <Button onClick={handleDeleteOrMark} disabled={!selectedPatient} className="button button-danger">
                  {selectedPatient?.isToBeDeleted ? 'Delete Patient' : 'Mark for Deletion'}
                </Button>
              </div>
    
              {/* Modal for confirmation before delete/mark */}
              {isModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <h2>{modalContent.title}</h2>
                    <p>{modalContent.message}</p>
                    <div>
                      <button onClick={modalContent.action}>Confirm</button>
                      <button onClick={closeModal}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </main>
            <Footer /> {/* Footer at the bottom */}
        </div>
      );
    
    
};

export default AdminPatient;