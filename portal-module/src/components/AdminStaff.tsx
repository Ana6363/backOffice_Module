import React, { useState, useEffect, useCallback } from 'react';
import { fetchStaff, createStaff, updateStaff, deactivateStaff } from '../services/StaffService';

const AdminStaff: React.FC = () => {
    const [staffList, setStaffList] = useState<any[]>([]);
    const [filter, setFilter] = useState({ 
        staffId: '',
        specialization: '',
        firstName: '', 
        lastName: '',
        phoneNumber: '',
        status: '' ,
    });
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

    const loadStaff = useCallback(async () => {
        try {
            const filterParams = {
                ...filter,
                phoneNumber: filter.phoneNumber ? Number(filter.phoneNumber) : undefined,
                status: filter.status ? (filter.status.toLowerCase() === 'active' ? "true" : "false") : undefined,
            };
            const data = await fetchStaff(filterParams);

            if (Array.isArray(data)) {
                setStaffList(data);
            } else {
                console.error('Expected staffMembers to be an array, received:', data);
                setStaffList([]);
            }
        } catch (error) {
            console.error('Error fetching staff:', error);
            setStaffList([]);
        }
    }, [filter]);

    useEffect(() => {
        loadStaff();
    }, [loadStaff]);

    const handleCreateStaff = async () => {
        try {
            await createStaff(staffData);
            alert('Staff created successfully');
            loadStaff();
        } catch (error) {
            console.error('Error creating staff:', error);
        }
    };

    const handleUpdateStaff = async () => {
        try {
            await updateStaff(staffData);
            alert('Staff updated successfully');
            loadStaff();
        } catch (error) {
            console.error('Error updating staff:', error);
        }
    };

    const handleDeactivateStaff = async (staffId: string) => {
        try {
            await deactivateStaff(staffId);
            alert('Staff deactivated successfully');
            loadStaff();
        } catch (error) {
            console.error('Error deactivating staff:', error);
        }
    };

    const addSlot = () => {
        setStaffData({
            ...staffData,
            availableSlots: [...staffData.availableSlots, { startTime: '', endTime: '' }],
        });
    };

    const handleSlotChange = (index: number, field: string, value: string) => {
        const updatedSlots = staffData.availableSlots.map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
        );
        setStaffData({ ...staffData, availableSlots: updatedSlots });
    };

    const removeSlot = (index: number) => {
        setStaffData({
            ...staffData,
            availableSlots: staffData.availableSlots.filter((_, i) => i !== index),
        });
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <div>
                <h2>Filter Staff</h2>
                {/* Filter inputs */}
                <input
                    type="text"
                    placeholder="Staff ID"
                    value={filter.staffId}
                    onChange={(e) => setFilter({ ...filter, staffId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Specialization"
                    value={filter.specialization}
                    onChange={(e) => setFilter({ ...filter, specialization: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={filter.firstName}
                    onChange={(e) => setFilter({ ...filter, firstName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={filter.lastName}
                    onChange={(e) => setFilter({ ...filter, lastName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={filter.phoneNumber}
                    onChange={(e) => setFilter({ ...filter, phoneNumber: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                />
                <button onClick={loadStaff}>Filter</button>
            </div>

            <div>
                <h2>Create or Update Staff</h2>
                {/* Staff inputs */}
                <input
                    type="text"
                    placeholder="Staff ID"
                    value={staffData.staffId}
                    onChange={(e) => setStaffData({ ...staffData, staffId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="License Number"
                    value={staffData.licenseNumber}
                    onChange={(e) => setStaffData({ ...staffData, licenseNumber: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Specialization"
                    value={staffData.specialization}
                    onChange={(e) => setStaffData({ ...staffData, specialization: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Phone Number"
                    value={staffData.phoneNumber}
                    onChange={(e) => setStaffData({ ...staffData, phoneNumber: parseInt(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={staffData.firstName}
                    onChange={(e) => setStaffData({ ...staffData, firstName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={staffData.lastName}
                    onChange={(e) => setStaffData({ ...staffData, lastName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={staffData.fullName}
                    onChange={(e) => setStaffData({ ...staffData, fullName: e.target.value })}
                />
                
                <div>
                    <h3>Available Slots</h3>
                    {staffData.availableSlots.map((slot, index) => (
                        <div key={index}>
                            <input
                                type="datetime-local"
                                placeholder="Start Time"
                                value={slot.startTime}
                                onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                            />
                            <input
                                type="datetime-local"
                                placeholder="End Time"
                                value={slot.endTime}
                                onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                            />
                            <button onClick={() => removeSlot(index)}>Remove Slot</button>
                        </div>
                    ))}
                    <button onClick={addSlot}>Add Slot</button>
                </div>
                
                <button onClick={handleCreateStaff}>Create</button>
                <button onClick={handleUpdateStaff}>Update</button>
            </div>

            <div>
                <h2>Staff List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>License Number</th>
                            <th>Specialization</th>
                            <th>Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {staffList.map((staff) => (
                        <tr key={staff.staffId}>
                            <td>{staff.staffId}</td>
                            <td>{staff.licenseNumber}</td>
                            <td>{staff.specialization}</td>
                            <td>{staff.phoneNumber}</td>
                            <td>{staff.status ? "Active" : "Inactive"}</td>
                            <td>
                                {staff.status && (
                                    <button onClick={() => handleDeactivateStaff(staff.staffId)}>Deactivate</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStaff;