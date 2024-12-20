import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import Button from '../../../components/Buttons/Buttons';
import './SchedulePage.css';

const SchedulePage: React.FC = () => {
    const navigate = useNavigate();
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        action: () => {},
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const callAlgorithm = async (algorithm: string) => {
        const path = "C:\\Users\\rafa1\\Documents\\planningModule"; // Directory for the terminal
        const startupFile = algorithm === "brute" ? "Startupb.pl" : "Startupg.pl"; // Determine Prolog file

        try {
            const payload = { path, file: startupFile };
            console.log("Payload being sent to open terminal:", payload);

            const response = await fetch("http://localhost:5000/open-terminal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload), // Pass the directory path and file
            });

            if (!response.ok) {
                throw new Error(`Failed to open terminal for ${algorithm} algorithm`);
            }

            const result = await response.json();
            console.log("Terminal opened successfully:", result);

            alert(`Terminal opened in path: ${path} with file: ${startupFile}`);
        } catch (error) {
            console.error("Error opening terminal:", error);
            alert("Failed to open terminal.");
        }
    };

    const openModal = (title: string, message: string, action: () => void) => {
        setModalContent({ title, message, action });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' },
        { id: 5, name: 'Schedule Algorithms', route: '/admin/schedule' },
        { id: 6, name: 'Manage Surgery Rooms', route: '/admin/surgeries' }
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Schedule Algorithms</h1>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <Button
                            onClick={() =>
                                openModal(
                                    'Run Brute Force',
                                    'Are you sure you want to open the terminal for Brute Force algorithm?',
                                    () => callAlgorithm('brute')
                                )
                            }
                            className="button button-primary"
                        >
                            Open Terminal for Brute Force
                        </Button>
                        <Button
                            onClick={() =>
                                openModal(
                                    'Run Greedy Algorithm',
                                    'Are you sure you want to open the terminal for Greedy algorithm?',
                                    () => callAlgorithm('greedy')
                                )
                            }
                            className="button button-primary"
                        >
                            Open Terminal for Greedy
                        </Button>
                    </div>

                    {/* Modal for confirmation */}
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>{modalContent.title}</h2>
                                <p>{modalContent.message}</p>
                                <div>
                                    <button onClick={modalContent.action} className="button button-primary">
                                        Confirm
                                    </button>
                                    <button onClick={closeModal} className="button button-secondary">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer /> {/* Footer at the bottom */}
        </div>
    );
};

export default SchedulePage;
