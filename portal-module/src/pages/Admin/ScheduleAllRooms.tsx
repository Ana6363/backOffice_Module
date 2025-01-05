import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Buttons/Buttons';
import Footer from '../../components/Footer/Footer';
import fs from 'fs'; // Import Node.js file system module
import path from 'path';

const AdminSurgeryRoom: React.FC = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [output, setOutput] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Paths for input and output files
    const planningModulePath = path.join(__dirname, '../../planningModule');
    const inputFilePath = path.join(planningModulePath, 'input.txt');
    const outputFilePath = path.join(planningModulePath, 'output.txt');

    const writeDateToInput = (date: string) => {
        try {
            fs.writeFileSync(inputFilePath, date, 'utf8');
            console.log(`Date written to ${inputFilePath}: ${date}`);
        } catch (err) {
            console.error('Error writing date:');
        }
    };

    const readOutputFile = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                try {
                    if (fs.existsSync(outputFilePath)) {
                        const result = fs.readFileSync(outputFilePath, 'utf8');
                        if (result) {
                            clearInterval(interval); // Stop checking once we have a result
                            resolve(result);
                        }
                    }
                } catch (err) {
                    clearInterval(interval);
                    reject(err);
                }
            }, 1000); // Check every 1 second
        });
    };

    const handleSubmit = async () => {
        if (!date) {
            alert('Please enter a date');
            return;
        }

        setIsLoading(true);
        setOutput(null);

        try {
            // Write date to input.txt
            writeDateToInput(date);

            // Wait for output.txt to be updated and fetch its content
            const result = await readOutputFile();
            setOutput(result);
        } catch (error) {
            console.error('Error processing date:', error);
            alert('An error occurred while processing the date.');
        } finally {
            setIsLoading(false);
        }
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

                    {output && (
                        <div className="result-container mt-8">
                            <h2 className="text-2xl font-bold text-center">Results</h2>
                            <pre className="output-box">{output}</pre>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminSurgeryRoom;
