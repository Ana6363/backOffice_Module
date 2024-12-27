import React, { useState, useEffect, useCallback } from 'react';
import { fetchSpecializations, addSpecialization, updateSpecialization, deleteSpecialization } from '../../../services/SpecializationsService';
import { useNavigate } from 'react-router-dom';
import SelectableTable from '../../../components/Table/SelectableTable';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import './Specializations.css';

const AdminSpecialization: React.FC = () => {
    const navigate = useNavigate();

    const [specializationList, setSpecializationList] = useState<any[]>([]);
    const [filter, setFilter] = useState({
        Name: '',
        Description: '',
    });
    const [selectedSpecialization, setSelectedSpecialization] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        action: () => {},
    });

    // Function to load specializations from the service
    const loadSpecializations = useCallback(async () => {
        try {
            const data = await fetchSpecializations(filter);
            console.log('Specialization List:', data); // Debugging log to confirm data structure
            setSpecializationList(data);
        } catch (error) {
            console.error('Error fetching specializations:', error);
            setSpecializationList([]); // Clear the list in case of error
        }
    }, [filter]);

    useEffect(() => {
        loadSpecializations();
    }, [loadSpecializations]);

    const handleCreateSpecialization = () => {
        navigate('/admin/specializations/create');
    };

    const handleUpdateSpecialization = () => {
        if (!selectedSpecialization) {
            alert("No specialization selected.");
            return;
        }
        navigate(`/admin/specializations/update/${selectedSpecialization.Name}`);
    };

    const handleDeleteSpecialization = async (specialization: { Name: string; Description: string }) => {
        try {
            await deleteSpecialization(specialization);
            alert('Specialization deleted successfully');
            loadSpecializations();
        } catch (error) {
            console.error('Error deleting specialization:', error);
        }
    };

    const openModal = (title: string, message: string, action: () => void) => {
        setModalContent({ title, message, action });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteConfirmation = () => {
        if (selectedSpecialization) {
            openModal(
                'Delete Specialization',
                `Are you sure you want to delete the specialization "${selectedSpecialization.Name}"?`,
                () => handleDeleteSpecialization({
                    Name: selectedSpecialization.Name,
                    Description: selectedSpecialization.Description,
                })
            );
        }
    };

    const menuItems = [
        {id: 1, name: 'Main Page', route: '/admin'},
        {id: 2, name: 'Manage Patients', route: '/admin/patient'},
        {id: 3, name: 'Manage Staff', route: '/admin/staff'},
        {id: 4, name: 'Manage Operation Types', route: '/admin/opTypes'},
        {id: 5, name: 'Schedule Surgeries', route: '/admin/schedule'},
        {id: 6, name: 'Manage Surgery Rooms', route: '/admin/surgeries'},
        {id: 7, name: 'Manage Specializations', route: '/admin/specializations'},
        {id: 8, name: 'Manage Room Types', route: '/admin/roomtypes'},
        {id: 9, name: 'Manage Allergies', route: '/admin/allergies'},
        {id: 10, name: 'Manage Medical Conditions', route: '/admin/medicalConditions'},
    ];
    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Admin Specialization Page</h1>

                    {/* Table Container */}
                    <div className="table-container">
                        <SelectableTable
                            data={specializationList}
                            headers={[
                                { key: 'Name', label: 'Specialization Name' },
                                { key: 'Description', label: 'Description' },
                            ]}
                            onRowSelect={setSelectedSpecialization}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <Button onClick={handleCreateSpecialization} className="button button-primary">
                            Create Specialization
                        </Button>
                        <Button onClick={handleUpdateSpecialization} disabled={!selectedSpecialization} className="button button-primary">
                            Update Specialization
                        </Button>
                        <Button onClick={handleDeleteConfirmation} disabled={!selectedSpecialization} className="button button-danger">
                            Delete Specialization
                        </Button>
                    </div>

                    {/* Modal for confirmation before delete */}
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
            <Footer />
        </div>
    );
};

export default AdminSpecialization;
