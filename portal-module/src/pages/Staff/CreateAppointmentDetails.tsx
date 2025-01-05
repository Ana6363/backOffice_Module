import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchDailyTimeSlots } from '../../services/SurgeryRoomService';
import { createAppointment } from '../../services/AppointmentService';


import Button from '../../components/Buttons/Buttons';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SelectableTable from '../../components/Table/SelectableTable';
import { fetchOperationRequest } from '../../services/OperationRequestService';

const CreateAppointmentDetails: React.FC = () => {
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
                const allRequests = await fetchOperationRequest({}); // Fetch all requests
                const matchingRequest = allRequests.find((req: any) => req.requestId === requestId);

                if (!matchingRequest) {
                    throw new Error(`No operation request found with ID: ${requestId}`);
                }

                // Set patient and staff from the matching request
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

                // Extract `$values` from timeSlots
                const extractedTimeSlots = data.timeSlots?.$values.map((slot: any) => ({
                    start: slot.start,
                    end: slot.end,
                })) || [];
                setTimeSlots(extractedTimeSlots);

                // Extract and process requirements and staff data
                const extractedRequirements = data.requirements?.$values.map((req: any) => ({
                    specialization: req.specialization,
                    neededPersonnel: req.neededPersonnel,
                    availableStaff: (data.staffBySpecialization?.$values || []).find(
                        (staff: any) => staff.specialization === req.specialization
                    )?.staffIds?.$values || [], // Store available staff IDs
                })) || [];
                setRequirementsTableData(extractedRequirements);
            } catch (err) {
                console.error('Error fetching daily time slots:', err);
            }
        };

        loadOperationRequestDetails();
        loadData();
    }, [date, requestId, roomNumber]);

    const handleCreateAppointment = async () => {
        if (!selectedTimeSlot) {
            alert('Please select a time slot.');
            return;
        }

        const neededPersonnel = requirementsTableData.map((req) => {
            const { specialization, neededPersonnel, availableStaff } = req;
            const selectedStaffIds = [...availableStaff].sort(() => 0.5 - Math.random()).slice(0, neededPersonnel);
            return selectedStaffIds.map((staffId: string) => ({
                specialization,
                staffId,
            }));
        }).flat(); // Flatten to ensure it's a single array

        console.log(selectedTimeSlot.start);

        const appointmentData = {
            schedule: selectedTimeSlot.start, // Use start time of the selected slot
            request: requestId || '', // Ensure requestId is passed
            patient: recordNumber || '', // Dynamically fetched
            staff: staffId || '', // Dynamically fetched
            neededPersonnel, // Generated dynamically
        };

        try {
            console.log(appointmentData.schedule);
            const response = await createAppointment(appointmentData);
            console.log('Appointment Created:', response);
            navigate('/operationRequest'); // Navigate back to operation requests after creation
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to create appointment. Please try again.');
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

                    {/* Time Slots */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
                        <SelectableTable
                            data={timeSlots}
                            headers={[
                                { key: 'start', label: 'Start Time' },
                                { key: 'end', label: 'End Time' },
                            ]}
                            onRowSelect={setSelectedTimeSlot} // Set selected time slot
                        />
                    </section>

                    {/* Requirements and Staff */}
                    <section className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Requirements and Staff</h2>
                        <SelectableTable
                            data={requirementsTableData.map((req) => ({
                                specialization: req.specialization,
                                neededPersonnel: req.neededPersonnel,
                                availableStaff: req.availableStaff.length, // Show count of available staff
                            }))}
                            headers={[
                                { key: 'specialization', label: 'Specialization' },
                                { key: 'neededPersonnel', label: 'Needed Personnel' },
                                { key: 'availableStaff', label: 'Available Staff' }, // Display count
                            ]}
                            disableRowSelection={true}
                        />
                    </section>

                    <div className="mt-8 text-center">
                        <Button
                            onClick={handleCreateAppointment}
                            className="button button-primary"
                            disabled={!recordNumber || !staffId} // Ensure patient and staff are loaded
                        >
                            Create Appointment
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreateAppointmentDetails;
