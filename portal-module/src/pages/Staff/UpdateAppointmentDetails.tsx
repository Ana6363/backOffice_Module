import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchDailyTimeSlots } from '../../services/SurgeryRoomService';
import { updateAppointment , fetchAppointments } from '../../services/AppointmentService';
import Button from '../../components/Buttons/Buttons';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SelectableTable from '../../components/Table/SelectableTable';
import { fetchOperationRequest } from '../../services/OperationRequestService';

const UpdateAppointmentDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [timeSlots, setTimeSlots] = useState<any[]>([]);
    const [requirementsTableData, setRequirementsTableData] = useState<any[]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<any | null>(null);
    const [recordNumber, setPatient] = useState<string | null>(null);
    const [staffId, setStaff] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Extract query parameters from the URL
    const params = new URLSearchParams(location.search);
    const requestId = params.get('requestId');
    const date = params.get('date');
    const roomNumber = params.get('roomNumber');

    useEffect(() => {
        if (!requestId || !date || !roomNumber) {
            setError('Missing required parameters.');
            return;
        }

        const loadOperationRequestDetails = async () => {
            try {
                const allRequests = await fetchOperationRequest({});
                const matchingRequest = allRequests.find((req: any) => req.requestId === requestId);

                if (!matchingRequest) {
                    throw new Error(`No operation request found with ID: ${requestId}`);
                }

                setPatient(matchingRequest.recordNumber);
                setStaff(matchingRequest.staffId);
            } catch (err) {
                console.error('Error fetching operation request details:', err);
                setError('Failed to load operation request details.');
            }
        };

        const loadData = async () => {
            try {
                const data = await fetchDailyTimeSlots(date, requestId, roomNumber);

                const extractedTimeSlots = data.timeSlots?.$values.map((slot: any) => ({
                    start: slot.start,
                    end: slot.end,
                })) || [];
                setTimeSlots(extractedTimeSlots);

                const extractedRequirements = data.requirements?.$values.map((req: any) => ({
                    specialization: req.specialization,
                    neededPersonnel: req.neededPersonnel,
                    availableStaff: (data.staffBySpecialization?.$values || []).find(
                        (staff: any) => staff.specialization === req.specialization
                    )?.staffIds?.$values || [],
                })) || [];
                setRequirementsTableData(extractedRequirements);
            } catch (err) {
                console.error('Error fetching daily time slots:', err);
            }
        };

        loadOperationRequestDetails();
        loadData();
    }, [date, requestId, roomNumber]);

    const handleUpdateAppointment = async () => {
        if (!selectedTimeSlot) {
            alert('Please select a time slot.');
            return;
        }
    
        const neededPersonnel = requirementsTableData.flatMap((req) => {
            const { specialization, neededPersonnel, availableStaff } = req;
            const selectedStaffIds = [...availableStaff].slice(0, neededPersonnel);
            return selectedStaffIds.map((staffId: string) => ({
                specialization,
                staffId,
            }));
        });
    
        try {
            // Fetch appointments to find the appointmentId for the matching requestId
            const allAppointments = await fetchAppointments();
            const matchingAppointment = allAppointments.find(
                (appointment: any) => appointment.request === requestId
            );
    
            if (!matchingAppointment) {
                alert('No appointment found for the provided request ID.');
                return;
            }
    
            const appointmentData = {
                appointementId: matchingAppointment.appointementId, // Retrieved from the matching appointment
                schedule: selectedTimeSlot.start,
                roomNumber: roomNumber || '',
                request: requestId || '',
                patient: recordNumber || '',
                staff: staffId || '',
                neededPersonnel,
            };
    
            const response = await updateAppointment(appointmentData);
            console.log('Appointment Updated:', response);
            alert('Appointment updated successfully!');
            navigate('/appointments');
        } catch (error) {
            console.error('Error updating appointment:', error);
            alert('Failed to update appointment. Please try again.');
        }
    };
    

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="app-wrapper">
            <Navbar
                menuItemsProp={[
                    { id: 1, name: 'Back to Operation Requests', route: '/operationRequest' },
                    { id: 2, name: 'Home', route: '/' },
                ]}
            />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Appointment Details</h1>

                    <section>
                        <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
                        <SelectableTable
                            data={timeSlots}
                            headers={[
                                { key: 'start', label: 'Start Time' },
                                { key: 'end', label: 'End Time' },
                            ]}
                            onRowSelect={setSelectedTimeSlot}
                        />
                    </section>

                    <section className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Requirements and Staff</h2>
                        <SelectableTable
                            data={requirementsTableData.map((req) => ({
                                specialization: req.specialization,
                                neededPersonnel: req.neededPersonnel,
                                availableStaff: req.availableStaff.length,
                            }))}
                            headers={[
                                { key: 'specialization', label: 'Specialization' },
                                { key: 'neededPersonnel', label: 'Needed Personnel' },
                                { key: 'availableStaff', label: 'Available Staff' },
                            ]}
                            disableRowSelection
                        />
                    </section>

                    <div className="mt-8 text-center">
                        <Button
                            onClick={handleUpdateAppointment}
                            className="button button-primary"
                            disabled={!recordNumber || !staffId || !selectedTimeSlot}
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

export default UpdateAppointmentDetails;
