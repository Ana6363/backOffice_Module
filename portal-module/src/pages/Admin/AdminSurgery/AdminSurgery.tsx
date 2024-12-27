import React, { useState, useEffect } from 'react';
import { fetchSurgeryRooms } from '../../../services/SurgeryRoomService';
import { fetchRoomTypes } from '../../../services/RoomTypeService';
import { useNavigate } from 'react-router-dom';
import SelectableTable from '../../../components/Table/SelectableTable';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';

const AdminSurgeryRoom: React.FC = () => {
    const navigate = useNavigate();
    const [surgeryRoomList, setSurgeryRoomList] = useState<any[]>([]);
    const [roomTypeMap, setRoomTypeMap] = useState<Record<string, string>>({});
    const [selectedSurgeryRoom, setSelectedSurgeryRoom] = useState<any | null>(null);

    const loadSurgeryRoomsAndRoomTypes = async () => {
        try {
            // Fetch room types and create a mapping from internalCode to designation
            const roomTypeData = await fetchRoomTypes();
            const roomTypeMapping: Record<string, string> = {};
            if (roomTypeData && roomTypeData.data && roomTypeData.data.$values) {
                roomTypeData.data.$values.forEach((type: any) => {
                    roomTypeMapping[type.internalCode] = type.designation;
                });
            }
            setRoomTypeMap(roomTypeMapping);

            // Fetch surgery rooms and map type to designation using roomTypeMap
            const surgeryRoomData = await fetchSurgeryRooms();
            if (surgeryRoomData && surgeryRoomData.$values && Array.isArray(surgeryRoomData.$values)) {
                const processedSurgeryRooms = surgeryRoomData.$values.map((room: any) => ({
                    ...room,
                    displayStatus: room.currentStatus || "Unknown", // Handle missing statuses
                    type: roomTypeMapping[room.type] || room.type, // Map type to designation or fallback to original type
                }));
                setSurgeryRoomList(processedSurgeryRooms);
            } else {
                console.error('Unexpected surgery room data format:', surgeryRoomData);
                setSurgeryRoomList([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setSurgeryRoomList([]);
        }
    };

    useEffect(() => {
        loadSurgeryRoomsAndRoomTypes();
    }, []);

    const handleCreateSurgeryRoom = () => {
        navigate('/admin/createSurgeryRoom');
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
                    <h1 className="text-3xl font-bold text-center mb-8">Admin Surgery Room Page</h1>

                    <div className="table-container">
                        <SelectableTable
                            data={surgeryRoomList}
                            headers={[
                                { key: 'roomNumber', label: 'Room Number' },
                                { key: 'type', label: 'Room Type' }, // Updated to display designation instead of type
                                { key: 'capacity', label: 'Capacity' },
                                { key: 'displayStatus', label: 'Current Status' },
                            ]}
                            onRowSelect={setSelectedSurgeryRoom}
                        />
                    </div>

                    <div className="action-buttons">
                        <Button onClick={handleCreateSurgeryRoom} className="button button-primary">
                            Create Surgery Room
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminSurgeryRoom;
