import React, { useState, useEffect, useCallback } from 'react';
import { fetchStaff, createStaff, updateStaff, deactivateStaff } from '../services/StaffService';

const AdminPage: React.FC = () => {
    const [staffList, setStaffList] = useState<any[]>([]);
    const [filter, setFilter] = useState({ 
        staffId: '',
        firstName: '', 
        lastName: '', 
        phoneNumber: '' 
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

    // Fetch staff data based on the filter and set staffList state
    const loadStaff = useCallback(async () => {
        try {
            const data = await fetchStaff({
                ...filter,
                phoneNumber: filter.phoneNumber ? Number(filter.phoneNumber) : undefined,
            });

            // Ensure data.staffMembers is an array before setting state
            if (Array.isArray(data)) {
                setStaffList(data);
            } else {
                console.error('Expected staffMembers to be an array, received:', data);
                setStaffList([]); // Reset to empty array if data is not valid
            }
        } catch (error) {
            console.error('Error fetching staff:', error);
            setStaffList([]); // Reset to empty array on error
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

    return (
        <div>
            <h1>Admin Page</h1>
            <div>
                <h2>Filter Staff</h2>
                <input
                    type="text"
                    placeholder="Staff ID"
                    value={filter.staffId}
                    onChange={(e) => setFilter({ ...filter, staffId: e.target.value })}
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
                <button onClick={loadStaff}>Filter</button>
            </div>

            <div>
                <h2>Create or Update Staff</h2>
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
                            <td>{staff.status ? "Active" : "Inactive"}</td> {/* Display status as Active/Inactive */}
                            <td>
                                <button onClick={() => handleDeactivateStaff(staff.staffId)}>Deactivate</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
