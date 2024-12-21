import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAppointments } from '../../services/AppointmentService';
import { fetchStaff } from '../../services/StaffService';
import { fetchPatient } from '../../services/PatientService';
import './StaffPage.css';
import Button from '../../components/Buttons/Buttons';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SelectableTable from '../../components/Table/SelectableTable';

const Appointments: React.FC = () => {
    const navigate = useNavigate();

    const [appointmentsList, setAppointmentsList] = useState<any[]>([]);
    const [staffMap, setStaffMap] = useState<Record<string, string>>({});
    const [patientMap, setPatientMap] = useState<Record<string, string>>({});
    const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                const data = await fetchAppointments();
                console.log('Fetched Appointments:', data);

                // Process appointments to add allocated staff by specialization
                const processedAppointments = data.map((appointment: any) => ({
                    ...appointment,
                    allocatedStaffBySpecialization: appointment.allocatedStaff?.reduce(
                        (acc: Record<string, string[]>, staff: any) => {
                            acc[staff.specialization] = acc[staff.specialization] || [];
                            acc[staff.specialization].push(staff.staffId);
                            return acc;
                        },
                        {}
                    ),
                }));

                setAppointmentsList(processedAppointments);

                // Fetch staff data to map staffId to fullName
                const staffMembers = await fetchStaff({});
                const staffFullNameMap = staffMembers.reduce(
                    (acc: Record<string, string>, staff: any) => {
                        acc[staff.staffId] = staff.fullName;
                        return acc;
                    },
                    {}
                );
                setStaffMap(staffFullNameMap);

                // Fetch patient data to map recordNumber to userId
                const patients = await fetchPatient({});
                const patientUserIdMap = patients.reduce(
                    (acc: Record<string, string>, patient: any) => {
                        acc[patient.recordNumber] = patient.userId;
                        return acc;
                    },
                    {}
                );
                setPatientMap(patientUserIdMap);
            } catch (error) {
                console.error('Failed to load appointments:', error);
                setError('Failed to load appointments.');
            }
        };

        loadAppointments();
    }, []);

    const handleUpdate = async () => {
        if (!selectedAppointment || !selectedAppointment.appointementId) {
            alert('Please select an appointment to update.');
            return;
        }
    
        try {
            // Fetch all appointments to find the associated requestId
            const allAppointments = await fetchAppointments();
            const matchingAppointment = allAppointments.find(
                (appointment: any) => appointment.appointementId === selectedAppointment.appointementId
            );
    
            if (!matchingAppointment || !matchingAppointment.request) {
                alert('Request ID not found for the selected appointment.');
                return;
            }
    
            // Redirect to the SelectDateAndRoom page with the requestId
            navigate(`/appointments/update/${matchingAppointment.request}`);
        } catch (error) {
            console.error('Error fetching appointments to find requestId:', error);
            alert('Failed to process the update. Please try again.');
        }
    };
    
    

    const staffMenuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Appointments', route: '/appointments' },
    ];

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={staffMenuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Appointments</h1>

                    {/* Table Container */}
                    <div className="table-container">
                        <SelectableTable
                            data={appointmentsList.map((appointment) => ({
                                appointementId: appointment.appointementId, // Include appointementId for update navigation
                                schedule: appointment.schedule,
                                patient: patientMap[appointment.patient] || appointment.patient, // Map recordNumber to userId
                                allocatedStaff: Object.entries(appointment.allocatedStaffBySpecialization || {})
                                    .map(
                                        ([specialization, staffIds]) =>
                                            `${specialization}: ${(staffIds as string[])
                                                .map((staffId) => staffMap[staffId] || staffId) // Map staffId to fullName
                                                .join(', ')}`
                                    )
                                    .join('; '),
                            }))}
                            headers={[
                                { key: 'appointementId', label: 'Appointment ID' }, // Include ID for clarity
                                { key: 'schedule', label: 'Schedule' },
                                { key: 'patient', label: 'Patient Email' }, // Updated label
                                { key: 'allocatedStaff', label: 'Allocated Staff' }, // New column
                            ]}
                            onRowSelect={setSelectedAppointment}
                        />
                    </div>

                    {/* Action Button */}
                    <div className="action-buttons">
                        <Button
                            onClick={handleUpdate}
                            disabled={!selectedAppointment}
                            className="button button-primary"
                        >
                            Update Appointment
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Appointments;
