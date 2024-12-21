const API_URL = `http://localhost:5184/api/v1/surgeryRoom`;
console.log(API_URL);

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});


export const fetchSurgeryRooms = async () => {
    const url = `${API_URL}/getAll`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch Surgery Rooms');

    const data = await response.json();


    if (!data.$values || !Array.isArray(data.$values)) {
        throw new Error('Unexpected data format: $values array is missing.');
    }

    return data.$values;
};


export const createSurgeryRoom = async (surgeryRoomData: {
    roomNumber: string;
    type: string;
    capacity: number;
}) => {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(surgeryRoomData),
    });
    if (!response.ok) throw new Error('Failed to create Surgery Room');
    return await response.json();
};

export const fetchRoomTypes = async () => {
    const url = `${API_URL}/getAll`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch Surgery Rooms');

    const data = await response.json();

    console.log("Fetch Surgery Rooms Response Data:", data);


    return data;
};

export const fetchDailyTimeSlots = async (date: string, requestId: string , roomNumber: string ) => {
    const url = `${API_URL}/getDailyTimeSlots?date=${encodeURIComponent(date)}&requestId=${encodeURIComponent(requestId)}&roomNumber=${encodeURIComponent(roomNumber)}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch daily time slots: ${errorText}`);
    }

    const data = await response.json();

    console.log("Fetch Daily Time Slots Response Data:", data);

    return data;
};


