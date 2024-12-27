import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStaff, updateStaff } from '../../../services/StaffService';
import Button from '../../../components/Buttons/Buttons';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import './UpdateStaff.css';

const UpdateStaff: React.FC = () => {
    const { staffId } = useParams(); // Get staffId from URL
    const navigate = useNavigate();

    const [staffData, setStaffData] = useState<any | null>(null); // Holds the fetched staff data
    const [formData, setFormData] = useState({
        staffId: '',
        licenseNumber: '',
        specialization: '',
        phoneNumber: 0,
        availableSlots: [{ startTime: '', endTime: '' }], // Initialize available slots as an array
        status: true,
        firstName: '',
        lastName: '',
        fullName: '',
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!staffId) {
            console.error("No staffId provided in the URL");
            navigate('/admin/staff'); // Redirect to staff list if no staffId
            return;
        }

        const fetchStaffData = async () => {
            try {
                setLoading(true);
                setError(null);
                const staffList = await fetchStaff({ staffId }); // Fetch staff data using the staffId from URL
                if (staffList.length === 1) {
                    const staff = staffList[0];
                    setStaffData(staff);
                    setFormData({
                        staffId: staff.staffId,
                        licenseNumber: staff.licenseNumber,
                        specialization: staff.specialization,
                        phoneNumber: staff.phoneNumber,
                        availableSlots: Array.isArray(staff.availableSlots) ? staff.availableSlots : [{ startTime: '', endTime: '' }],
                        status: staff.status,
                        firstName: staff.firstName,
                        lastName: staff.lastName,
                        fullName: staff.fullName,
                    });
                } else {
                    console.error("Staff not found");
                    alert("Staff not found");
                    navigate('/admin/staff');
                }
            } catch (error) {
                console.error("Error fetching staff data:", error);
                setError('Error fetching staff data');
                navigate('/admin/staff');
            } finally {
                setLoading(false);
            }
        };

        fetchStaffData();
    }, [staffId, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSlotChange = (index: number, field: string, value: string) => {
        const updatedSlots = formData.availableSlots.map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
        );
        setFormData({
            ...formData,
            availableSlots: updatedSlots,
        });
    };

    const addSlot = () => {
        setFormData({
            ...formData,
            availableSlots: [...formData.availableSlots, { startTime: '', endTime: '' }],
        });
    };

    const removeSlot = (index: number) => {
        setFormData({
            ...formData,
            availableSlots: formData.availableSlots.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true); // Set loading state while submitting
            await updateStaff(formData); // Call updateStaff service to save changes
            alert("Staff data updated successfully");
            navigate('/admin/staff');
        } catch (error) {
            console.error("Error updating staff:", error);
            alert("Error updating staff data");
        } finally {
            setLoading(false); // Reset loading state after the submission
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
        <div className="update-staff-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Update Staff</h1>

                    {loading ? (
                        <div>Loading...</div> // Display loading message while data is being fetched
                    ) : error ? (
                        <div className="error-message">{error}</div> // Display error message
                    ) : staffData ? (
                        <form onSubmit={handleSubmit} className="update-staff-form">
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
                                <label htmlFor="specialization">Specialization</label>
                                <input
                                    type="text"
                                    id="specialization"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Available Slots</label>
                                {formData.availableSlots.map((slot, index) => (
                                    <div key={index} className="slot-row">
                                        <input
                                            type="datetime-local"
                                            value={slot.startTime}
                                            onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                                            placeholder="Start Time"
                                        />
                                        <input
                                            type="datetime-local"
                                            value={slot.endTime}
                                            onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                                            placeholder="End Time"
                                        />
                                        <div className="button-container">
                                            <Button onClick={() => removeSlot(index)} className="button button-danger">
                                                Remove Slot
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button onClick={addSlot} className="button button-primary">
                                    Add Slot
                                </Button>
                            </div>

                            <Button type="submit" className="button button-primary">
                            Update Staff
                        </Button>

                        </form>
                    ) : (
                        <div>No staff data available</div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UpdateStaff;