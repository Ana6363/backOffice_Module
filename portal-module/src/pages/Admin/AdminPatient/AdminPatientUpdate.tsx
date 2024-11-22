import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPatient, updatePatient } from '../../../services/PatientService';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import './CreateAndUpdatePatient.css';


const UpdatePatient: React.FC = () => {
    const { phoneNumber } = useParams(); // Get the phoneNumber from URL
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        recordNumber: '',
        dateOfBirth: '',
        phoneNumber: 0,
        emergencyContact: 0,
        gender: '',
        userId: '',
        firstName: '',
        lastName: '',
        fullName: '',
    });

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const patientList = await fetchPatient({ phoneNumber: phoneNumber || '' });

                if (patientList.length === 1) {
                    const patient = patientList[0];
                    setPatientData(patient);
                    setFormData({
                        recordNumber: patient.recordNumber,
                        dateOfBirth: patient.dateOfBirth,
                        phoneNumber: patient.phoneNumber,
                        emergencyContact: patient.emergencyContact,
                        gender: patient.gender,
                        userId: patient.userId,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                        fullName: patient.fullName,
                    });
                } else {
                    console.error("Patient not found");
                    alert("Patient not found");
                    navigate('/admin/patient');
                }
            } catch (error) {
                console.error("Error fetching patient data:", error);
                alert("Error fetching patient data");
            }
        };

        if (phoneNumber) {
            fetchPatientData();
        }
    }, [phoneNumber, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            await updatePatient(formData); // Send updated patient data
            alert("Patient data updated successfully");
            navigate('/admin/patient'); // Redirect to the patient list page
        } catch (error) {
            console.error("Error updating patient:", error);
            alert("Error updating patient data");
        }
    };
    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: '/admin/patient' },
        { id: 3, name: 'Manage Staff', route: '/admin/staff' },
        { id: 4, name: 'Manage Operation Types', route: 'opTypes' },
    ];

    return (
        <div className="update-patient-wrapper">
            <Navbar menuItemsProp={menuItems} /> {/* Add Navbar with menu items here */}
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Update Patient</h1>

                    {patientData ? (
                        <form onSubmit={handleSubmit} className="update-patient-form">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <input
                                    type="text"
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="emergencyContact">Emergency Contact</label>
                                <input
                                    type="tel"
                                    id="emergencyContact"
                                    name="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="userId">User ID (Email)</label>
                                <input
                                    type="email"
                                    id="userId"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <Button onClick={() => handleSubmit({} as React.FormEvent)} className="button button-primary">
                                Update Patient
                            </Button>
                        </form>
                    ) : (
                        <p>Loading patient data...</p>
                    )}
                </div>
            </main>
            <Footer /> {/* Add Footer here */}
        </div>
    );
};

export default UpdatePatient;