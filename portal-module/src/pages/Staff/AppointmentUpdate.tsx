import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSurgeryRooms } from '../../services/SurgeryRoomService';
import Button from '../../components/Buttons/Buttons';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const UpdateAppointment: React.FC = () => {
    const navigate = useNavigate();
    const { appointmentId } = useParams<{ appointmentId: string }>(); // Extract appointmentId from URL

    const [date, setDate] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [availableRooms, setAvailableRooms] = useState<string[]>([]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRoomNumber(event.target.value);
    };

    const loadAvailableRooms = async () => {
        try {
            const rooms = await fetchSurgeryRooms();
            setAvailableRooms(rooms.map((room: { roomNumber: any }) => room.roomNumber));
        } catch (error) {
            console.error('Failed to fetch surgery rooms:', error);
        }
    };

    const handleSubmit = () => {
        if (!date || !roomNumber) {
            alert('Please select both date and room.');
            return;
        }

        // Navigate to the next step with the selected date and room
        navigate(
            `/appointments/updateDetails?requestId=${encodeURIComponent(
                appointmentId || ''
            )}&date=${encodeURIComponent(date)}&roomNumber=${encodeURIComponent(roomNumber)}`
        );
    };

    useEffect(() => {
        loadAvailableRooms();
    }, []);

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
        { id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel' },
        { id: 3, name: 'Manage Appointments', route: '/appointments' },
        { id: 4, name: 'Search Allergies', route: '/allergies' },
        { id: 5, name: 'Search Medical Conditions', route: '/medicalConditions' }
      ];
    return (
        <div className="app-wrapper">
            {/* Navbar */}
            <Navbar menuItemsProp={menuItems} />

            {/* Main Content */}
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Update Appointment</h1>
                    <div className="form-group">
                        <label htmlFor="date">Select Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={handleDateChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="room">Select Room:</label>
                        <select
                            id="room"
                            value={roomNumber}
                            onChange={handleRoomChange}
                            className="form-control"
                        >
                            <option value="">-- Select a Room --</option>
                            {availableRooms.map((room) => (
                                <option key={room} value={room}>
                                    {room}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="action-buttons">
                        <Button onClick={handleSubmit} className="button button-primary">
                            Proceed
                        </Button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default UpdateAppointment;
