
// Define the API URL
const API_URL = 'http://localhost:5184/api/v1/surgeryRoom';

// Function to get request headers (with authorization token)
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

// Function to fetch surgery rooms from the API
export const fetchSurgeryRooms = async () => {
    try {
        const response = await fetch(`${API_URL}/GetAllSurgeryRooms`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            const errorDetails = await response.text(); // Get the response error body
            throw new Error(`Failed to fetch surgery rooms: ${errorDetails}`);
        }

        const data = await response.json();
        return data.surgeryRooms || []; // Return surgery rooms or an empty array
    } catch (error) {
        console.error('Error fetching surgery rooms:', error);
        throw new Error('Failed to fetch surgery rooms');
    }
};

// Room position mappings
const roomPositions = {
    R001: [2, 1],
    R002: [2, 4],
    R003: [2, 7],
    R004: [8, 1],
    R005: [8, 4],
    R006: [8, 7],
};

// Interval manager to avoid duplicate intervals
let monitorInterval = null;

// Monitor rooms and update the maze map
export const monitorRooms = (mazeInstance) => {
    // Clear any previous interval if already running
    if (monitorInterval) {
        clearInterval(monitorInterval);
    }

    monitorInterval = setInterval(async () => {
        try {
            // Fetch surgery rooms
            const rooms = await fetchSurgeryRooms();

            // Update the matrix for each room
            rooms.forEach((room) => {
                const { roomId, status } = room;

                console.log(`Checking roomId: ${roomId}, status: ${status}`);

                // Ensure roomId is mapped to a position
                if (!roomPositions[roomId]) {
                    console.warn(`Room ${roomId} not found in roomPositions mapping. Skipping.`);
                    return;
                }

                const [row, col] = roomPositions[roomId];
                console.log(`Mapped room ${roomId} to position: [${row}, ${col}]`);

                // Update the maze instance's map
                if (status === 'Occupied' || status === 'Available') {
                    mazeInstance.updateRoomStatusAtPosition(row, col, status);
                } else {
                    console.warn(`Unexpected status '${status}' for room ${roomId}. Skipping.`);
                }
            });
        } catch (error) {
            console.error('Error monitoring rooms:', error);
        }
    }, 60000); // Update every 1 minute
};
