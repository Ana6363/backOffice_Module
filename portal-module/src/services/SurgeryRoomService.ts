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

    console.log("Fetch Surgery Rooms Response Data:", data);


    return data;
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

