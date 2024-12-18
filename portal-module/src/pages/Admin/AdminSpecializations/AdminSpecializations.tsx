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
        specializationId: '',
        specializationDescription: '',
    });
    const [selectedSpecialization, setSelectedSpecialization] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        action: () => {},
    });

    const loadSpecializations = useCallback(async () => {
        try {
            const data = await fetchSpecializations(filter);
            if (Array.isArray(data)) {
                setSpecializationList(data);
            } else {
                console.error('Expected specialization list to be an array, received:', data);
                setSpecializationList([]);
            }
        } catch (error) {
            console.error('Error fetching specializations:', error);
            setSpecializationList([]);
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
        navigate(`/admin/specializations/update/${selectedSpecialization.specializationId}`);
    };

    const handleDeleteSpecialization = async (specializationId: string) => {
        try {
            await deleteSpecialization(specializationId);
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
                `Are you sure you want to delete the specialization "${selectedSpecialization.specializationId}"?`,
                () => handleDeleteSpecialization(selectedSpecialization.specializationId)
            );
        }
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Specializations', route: '/admin/specializations' },
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
                                { key: 'specializationId', label: 'Specialization ID' },
                                { key: 'specializationDescription', label: 'Description' },
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
