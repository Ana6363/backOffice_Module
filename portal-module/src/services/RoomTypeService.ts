const API_URL = `http://localhost:5184/api/v1/roomtype`;
console.log(API_URL);

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});


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

