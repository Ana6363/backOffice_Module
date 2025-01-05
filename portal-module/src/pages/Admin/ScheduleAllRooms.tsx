import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Buttons/Buttons';
import Footer from '../../components/Footer/Footer';

const AdminSurgeryRoom: React.FC = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [formattedOutput, setFormattedOutput] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!date) {
            alert('Please enter a date');
            return;
        }

        setIsLoading(true);
        setFormattedOutput(null);

        try {
            // Send date to the backend
            const response = await fetch('http://localhost:3001/process-date', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to process date');
            }

            const data = await response.json();

            // Parse and format the result
            const prettyOutput = formatOutput(data.result);
            setFormattedOutput(prettyOutput);
        } catch (error: any) {
            console.error('Error processing date:', error.message);
            alert(error.message || 'An error occurred while processing the date.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatOutput = (response: string): string => {
        // Split the response into the rooms and weight parts
        const [roomsAndOps, weight] = response.split('*'); 
    
        // Define the type for the rooms array
        const rooms: { room: string; operations: string[] }[] = [];
    
        // Regular expression to match the Prolog-like room and operations structure
        const roomRegex = /R\d{3}-\[(.*?)\]/g; // Matches `Rxxx-[op...]`
        let match;
    
        while ((match = roomRegex.exec(roomsAndOps)) !== null) {
            const roomName = match[0].split('-[')[0];
            const operations = match[1].split(',').map((op) => op.trim());
            rooms.push({ room: roomName, operations });
        }
    
        // Build a pretty string
        let prettyOutput = 'Schedule Details:\n\n';
        rooms.forEach(({ room, operations }) => {
            prettyOutput += `Room: ${room}\n`;
            prettyOutput += `Operations: ${operations.join(', ')}\n\n`;
        });
    
        prettyOutput += `Final Schedule Weight: ${weight}`;
        return prettyOutput;
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
        { id: 9, name: 'Manage Allergies', route: '/admin/allergies' },
        { id: 10, name: 'Manage Medical Conditions', route: '/admin/medicalConditions' },
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Date-Based Processing Page</h1>

                    <div className="form-container">
                        <label htmlFor="date-input" className="label">
                            Enter a Date:
                        </label>
                        <input
                            id="date-input"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input"
                        />
                    </div>

                    <div className="action-buttons mt-4">
                        <Button
                            onClick={handleSubmit}
                            className="button button-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Submit'}
                        </Button>
                    </div>

                    {formattedOutput && (
                        <div className="result-container mt-8">
                            <h2 className="text-2xl font-bold text-center">Results</h2>
                            <pre className="output-box">{formattedOutput}</pre>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminSurgeryRoom;
