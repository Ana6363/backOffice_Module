import React, { useState, useEffect, useCallback } from 'react';
import { fetchRoomTypes } from '../../../services/RoomTypeService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import SelectableTable from '../../../components/Table/SelectableTable';
import './RoomTypes.css';

const AdminRoomType: React.FC = () => {
    const navigate = useNavigate();

    const [roomTypeList, setRoomTypeList] = useState<any[]>([]);
    const [selectedRoomType, setSelectedRoomType] = useState<any | null>(null);

    // Function to load room types from the service
    const loadRoomTypes = useCallback(async () => {
        try {
            const data = await fetchRoomTypes();
            console.log('Room Type List:', data); // Debugging log to confirm data structure
            setRoomTypeList(data?.data?.$values || []); // Adjust the response to extract the correct list
        } catch (error) {
            console.error('Error fetching room types:', error);
            setRoomTypeList([]); // Clear the list in case of error
        }
    }, []);

    useEffect(() => {
        loadRoomTypes();
    }, [loadRoomTypes]);

    const handleCreateRoomType = () => {
        navigate('/admin/roomtypes/create');
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' },
        { id: 5, name: 'Schedule Surgeries', route: '/admin/schedule' },
        { id: 6, name: 'Manage Surgery Rooms', route: '/admin/surgeries' },
        { id: 7, name: 'Manage Specializations', route: '/admin/specializations' },
        { id: 8, name: 'Manage Room Types', route: '/admin/roomtypes' },
        { id: 9, name: 'Manage Allergies', route: '/admin/allergies' }
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Admin Room Type Page</h1>

                    {/* Table Container */}
                    <div className="table-container">
                        <SelectableTable
                            data={roomTypeList}
                            headers={[
                                { key: 'internalCode', label: 'Internal Code' },
                                { key: 'designation', label: 'Designation' },
                                { key: 'description', label: 'Description' },
                                { key: 'surgerySuitability', label: 'Surgery Suitability' },
                            ]}
                            onRowSelect={setSelectedRoomType}
                        />
                    </div>

                    {/* Create Button */}
                    <div className="action-buttons">
                        <Button onClick={handleCreateRoomType} className="button button-primary">
                            Create Room Type
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminRoomType;
