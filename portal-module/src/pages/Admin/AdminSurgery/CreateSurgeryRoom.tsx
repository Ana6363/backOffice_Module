import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSurgeryRoom} from '../../../services/SurgeryRoomService';
import { fetchRoomTypes } from '../../../services/RoomTypeService';
import Navbar from '../../../components/Navbar/Navbar';
import Button from '../../../components/Buttons/Buttons';
import './CreateSurgeryRoom.css';

const CreateSurgeryRoom: React.FC = () => {
    const navigate = useNavigate();

    const [surgeryRoomData, setSurgeryRoomData] = useState({
        roomNumber: '',
        type: '', // This will store the internalCode selected by the user
        capacity: '',
    });

    const [roomTypes, setRoomTypes] = useState<any[]>([]);

    // Fetch room types on component load
    useEffect(() => {
        const loadRoomTypes = async () => {
            try {
                const data = await fetchRoomTypes();
                if (data && data.data && data.data.$values) {
                    setRoomTypes(data.data.$values);
                } else {
                    console.error('Unexpected room type data format:', data);
                }
            } catch (error) {
                console.error('Error fetching room types:', error);
            }
        };

        loadRoomTypes();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSurgeryRoomData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createSurgeryRoom({
                roomNumber: surgeryRoomData.roomNumber,
                type: surgeryRoomData.type, // Pass the selected internalCode
                capacity: parseInt(surgeryRoomData.capacity),
            });
            alert('Surgery Room created successfully');
            navigate('/admin/surgeries'); // Redirect to the surgery rooms list
        } catch (error) {
            console.error('Error creating surgery room:', error);
            alert('Error creating surgery room');
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
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Surgery Room</h1>
                    <form onSubmit={handleSubmit} className="surgery-room-form">
                        <div className="form-group">
                            <label htmlFor="roomNumber">Room Number</label>
                            <input
                                type="text"
                                id="roomNumber"
                                name="roomNumber"
                                value={surgeryRoomData.roomNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Room Type</label>
                            <select
                                id="type"
                                name="type"
                                value={surgeryRoomData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select Room Type
                                </option>
                                {roomTypes.map((roomType) => (
                                    <option key={roomType.internalCode} value={roomType.internalCode}>
                                        {roomType.designation}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="capacity">Capacity</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={surgeryRoomData.capacity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Button type="submit" className="button button-primary">
                                Create Surgery Room
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateSurgeryRoom;
