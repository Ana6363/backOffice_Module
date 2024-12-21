import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchSurgeryRooms } from '../../services/SurgeryRoomService';
import Button from '../../components/Buttons/Buttons';

const CreateAppointment: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract requestId from the query string
    const params = new URLSearchParams(location.search);
    const requestId = params.get('requestId') || '';

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
            setAvailableRooms(rooms.map((room: { roomNumber: any; }) => room.roomNumber));
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
        navigate(`/operationRequest/createAppointmentDetails?requestId=${encodeURIComponent(requestId)}&date=${encodeURIComponent(date)}&roomNumber=${encodeURIComponent(roomNumber)}`);
    };

    React.useEffect(() => {
        loadAvailableRooms();
    }, []);

    return (
        <div className="container">
            <h1 className="text-3xl font-bold text-center mb-8">Create Appointment</h1>
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
    );
};

export default CreateAppointment;
