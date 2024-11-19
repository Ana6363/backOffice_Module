import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../../../services/PatientService';
import Button from '../../../components/Buttons/Buttons';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';

const CreatePatient: React.FC = () => {
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({
        dateOfBirth: '',
        phoneNumber: 0,
        emergencyContact: 0,
        gender: '',
        userId: '',
        firstName: '',
        lastName: '',
        fullName: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPatientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPatient(patientData);
            alert('Patient created successfully');
            navigate('/admin/patient');  // Redirect to the admin patient page
        } catch (error) {
            console.error('Error creating patient:', error);
            alert('Error creating patient');
        }
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: 'patient' },
        { id: 3, name: 'Manage Staff', route: 'staff' },
        { id: 4, name: 'Manage Operation Types', route: 'opTypes' },
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Patient</h1>
                    <form onSubmit={handleSubmit} className="patient-form">
                        <div className="form-group">
                            <label htmlFor="userId">User ID (Email)</label>
                            <input
                                type="email"
                                id="userId"
                                name="userId"
                                value={patientData.userId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={patientData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={patientData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={patientData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={patientData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={patientData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="emergencyContact">Emergency Contact</label>
                            <input
                                type="tel"
                                id="emergencyContact"
                                name="emergencyContact"
                                value={patientData.emergencyContact}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={patientData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            {/* Pass an empty function to match the expected Button signature */}
                            <Button onClick={() => handleSubmit({} as React.FormEvent)} className="button button-primary">
                                Create Patient
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer /> {/* Footer at the bottom */}
        </div>
    );
};

export default CreatePatient;
