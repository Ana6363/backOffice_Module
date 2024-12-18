import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStaff, deactivateStaff } from '../../../services/StaffService';
import SelectableTable from '../../../components/Table/SelectableTable';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import './Staff.css';

const AdminStaff: React.FC = () => {
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState<any[]>([]);
    const [selectedStaff, setSelectedStaff] = useState<any | null>(null);

    useEffect(() => {
        const loadStaff = async () => {
            try {
                const data = await fetchStaff({});
                setStaffList(data);
            } catch (error) {
                console.error('Error fetching staff:', error);
            }
        };
        loadStaff();
    }, []);

    const handleCreateStaff = () => {
        navigate('/admin/staff/create');
    };

    const handleUpdateStaff = () => {
        if (!selectedStaff) {
            alert('Please select a staff member to update.');
            return;
        }
        navigate(`/admin/staff/update/${selectedStaff.staffId}`);
    };

    const handleDeactivateStaff = async () => {
        if (!selectedStaff) {
            alert('Please select a staff member to deactivate.');
            return;
        }
        try {
            await deactivateStaff(selectedStaff.staffId);
            alert('Staff member deactivated successfully.');
            setStaffList((prev) => prev.filter((staff) => staff.staffId !== selectedStaff.staffId));
        } catch (error) {
            console.error('Error deactivating staff:', error);
        }
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' },
        { id: 5, name: 'Manage Specializations', route: '/admin/specializations' },

    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Manage Staff</h1>
                    <div className="table-container">
                        <SelectableTable
                            data={staffList}
                            headers={[
                                { key: 'staffId', label: 'Staff' },
                                { key: 'firstName', label: 'First Name' },
                                { key: 'lastName', label: 'Last Name' },
                                { key: 'specialization', label: 'Specialization' },
                                { key: 'phoneNumber', label: 'Phone Number' },
                                { key: 'status', label: 'Status' },
                            ]}
                            onRowSelect={setSelectedStaff}
                        />
                    </div>
                    <div className="action-buttons">
                        <Button onClick={handleCreateStaff} className="button button-primary">Create Staff</Button>
                        <Button onClick={handleUpdateStaff} disabled={!selectedStaff} className="button button-primary">
                            Update Staff
                        </Button>
                        <Button onClick={handleDeactivateStaff} disabled={!selectedStaff} className="button button-danger">
                            Deactivate Staff
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminStaff;