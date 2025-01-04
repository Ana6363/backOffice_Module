const API_URL = `https://api-dotnet.hospitalz.site/api/v1/appointement`;
console.log(API_URL);

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

interface NeededPersonnel {
  specialization: string;
  staffId: string;
}

interface AppointmentRequest {
  schedule: string;
  request: string;
  patient: string;
  staff: string;
  neededPersonnel: NeededPersonnel[];
}

export const createAppointment = async (appointmentData: {
    schedule: string;
    request: string;
    patient: string;
    staff: string;
    neededPersonnel: { specialization: string; staffId: string }[];
  }): Promise<any> => {
    const url = `${API_URL}/create`;

    try {
      // Manually format the schedule to add `T` between date and time
      const formattedSchedule = appointmentData.schedule.includes('T')
        ? appointmentData.schedule // If already formatted, use as is
        : appointmentData.schedule.replace(' ', 'T');

      const formattedData = {
        ...appointmentData,
        schedule: formattedSchedule, // Replace schedule with the formatted version
      };

      console.log('Original Schedule:', appointmentData.schedule);
      console.log('Formatted Schedule:', formattedData.schedule);

      const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(), // Ensure Content-Type is application/json
        body: JSON.stringify(formattedData), // Serialize the data correctly
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create appointment: ${errorText}`);
      }

      const data = await response.json();
      console.log('Appointment created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  };


interface AllocatedStaff {
  staffId: string;
  specialization: string;
}

interface SurgeryPhase {
  id: number;
  roomNumber: string;
  phaseType: string;
  duration: number;
  startTime: string;
  endTime: string;
}

interface Appointment {
  appointementId: string;
  schedule: string;
  request: string;
  patient: string;
  staff: string;
  allocatedStaff: AllocatedStaff[];
  surgeryPhases: SurgeryPhase[];
}

interface AppointmentUpdateRequest {
    appointementId: string;
    schedule: string;
    roomNumber: string;
    neededPersonnel: NeededPersonnel[];
}

export const fetchAppointments = async (): Promise<Appointment[]> => {
    const url = `${API_URL}/getAll`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch appointments: ${errorText}`);
        }

        const data = await response.json();
        console.log('Raw Appointments Data:', data);

        // Process the response to map `$values`
        const appointments = (data.appointements?.$values || []).map((appointment: any) => ({
            appointementId: appointment.appointementId,
            schedule: appointment.schedule,
            request: appointment.request,
            patient: appointment.patient,
            staff: appointment.staff,
            allocatedStaff: (appointment.allocatedStaff?.$values || []).map((staff: any) => ({
                staffId: staff.staffId,
                specialization: staff.specialization,
            })),
            surgeryPhases: (appointment.surgeryPhases?.$values || []).map((phase: any) => ({
                id: phase.id,
                roomNumber: phase.roomNumber,
                phaseType: phase.phaseType,
                duration: phase.duration,
                startTime: phase.startTime,
                endTime: phase.endTime,
            })),
        }));

        console.log('Processed Appointments:', appointments);
        return appointments;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

export const updateAppointment = async (appointmentUpdateData: AppointmentUpdateRequest): Promise<any> => {
    const url = `${API_URL}/update`;

    try {
        // Format the schedule if necessary
        const formattedSchedule = appointmentUpdateData.schedule.includes('T')
            ? appointmentUpdateData.schedule
            : appointmentUpdateData.schedule.replace(' ', 'T');

        const formattedData = {
            ...appointmentUpdateData,
            schedule: formattedSchedule, // Ensure schedule is correctly formatted
        };

        console.log('Original Update Data:', appointmentUpdateData);
        console.log('Formatted Update Data:', formattedData);

        const response = await fetch(url, {
            method: 'PUT', // HTTP PUT method for updates
            headers: getHeaders(),
            body: JSON.stringify(formattedData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update appointment: ${errorText}`);
        }

        const data = await response.json();
        console.log('Appointment updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};

  
