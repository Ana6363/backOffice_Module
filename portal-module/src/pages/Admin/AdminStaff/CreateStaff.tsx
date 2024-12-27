import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStaff } from '../../../services/StaffService';
import Button from '../../../components/Buttons/Buttons';
import Navbar from '../../../components/Navbar/Navbar';
import './CreateStaff.css';

const CreateStaff: React.FC = () => {
    const navigate = useNavigate();

    const [staffData, setStaffData] = useState({
        staffId: '',
        licenseNumber: '',
        specialization: '',
        phoneNumber: 0,
        availableSlots: [{ startTime: '', endTime: '' }],
        status: true,
        firstName: '',
        lastName: '',
        fullName: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStaffData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSlotChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
        const updatedSlots = [...staffData.availableSlots];
        updatedSlots[index][field] = value;
        setStaffData({ ...staffData, availableSlots: updatedSlots });
    };

    const handleAddSlot = () => {
        setStaffData((prevData) => ({
            ...prevData,
            availableSlots: [...prevData.availableSlots, { startTime: '', endTime: '' }],
        }));
    };

    const handleRemoveSlot = (index: number) => {
        const updatedSlots = [...staffData.availableSlots];
        updatedSlots.splice(index, 1);
        setStaffData({ ...staffData, availableSlots: updatedSlots });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            // Convert availableSlots to the desired format
            const formattedSlots = staffData.availableSlots.map((slot) => ({
                startTime: slot.startTime.replace('T', ' ') + ':00', // Convert "YYYY-MM-DDTHH:mm" to "YYYY-MM-DD HH:mm:SS"
                endTime: slot.endTime.replace('T', ' ') + ':00',
            }));
    
            const payload = {
                ...staffData,
                availableSlots: formattedSlots,
            };
    
            await createStaff(payload);
            alert('Staff member created successfully');
            navigate('/admin/staff'); // Redirect to the admin staff page
        } catch (error) {
            console.error('Error creating staff:', error);
            alert('Error creating staff');
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
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Staff Member</h1>
                    <form onSubmit={handleSubmit} className="staff-form">
                    <div className="form-group">
                            <label htmlFor="staffId">Staff Email</label>
                            <input
                                type="email"
                                id="staffId"
                                name="staffId"
                                value={staffData.staffId}
                                onChange={handleChange}
                                required
                            />
                        </div>    
                    <div className="form-group">
                            <label htmlFor="licenseNumber">License Number</label>
                            <input
                                type="text"
                                id="licenseNumber"
                                name="licenseNumber"
                                value={staffData.licenseNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="specialization">Specialization</label>
                            <input
                                type="text"
                                id="specialization"
                                name="specialization"
                                value={staffData.specialization}
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
                                value={staffData.phoneNumber}
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
                                value={staffData.firstName}
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
                                value={staffData.lastName}
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
                                value={staffData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={staffData.status ? 'active' : 'inactive'}
                                onChange={handleChange}
                                required
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="form-group">
                        <label>Available Slots</label>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Start Date & Time</th>
                                    <th>End Date & Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffData.availableSlots.map((slot, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="datetime-local"
                                                value={slot.startTime}
                                                onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="datetime-local"
                                                value={slot.endTime}
                                                onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSlot(index)}
                                                className="button button-danger"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            type="button"
                            onClick={handleAddSlot}
                            className="button button-primary"
                        >
                            Add Slot
                        </button>
                    </div>


                        <div className="form-group">
                        <Button onClick={() => handleSubmit({} as React.FormEvent)} className="button button-primary">
                                Create Staff
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateStaff;