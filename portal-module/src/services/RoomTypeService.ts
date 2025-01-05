const API_URL = `https://api-dotnet.hospitalz.site/api/v1/roomtype`;
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

export const addRoomType = async (roomType: {
    InternalCode: string;
    Designation: string;
    Description?: string;
    SurgerySuitability: string;
}) => {
    // Verificar se todos os campos necessários estão presentes
    if (!roomType.InternalCode || !roomType.Designation || !roomType.SurgerySuitability) {
        throw new Error('Required fields are missing');
    }

    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            InternalCode: roomType.InternalCode, // Certifique-se de que o campo "Name" seja válido
            Designation: roomType.Designation,
            Description: roomType.Description || '', // Se Description for opcional, passar uma string vazia
            SurgerySuitability: roomType.SurgerySuitability,
        }),
    });

    if (!response.ok) {
        // Para entender o motivo do erro, tente capturar a resposta de erro
        const errorData = await response.json();
        console.error('Error from API:', errorData);
        throw new Error('Failed to add Surgery Room');
    }

    const data = await response.json();
    console.log("Add Surgery Room Response Data:", data);

    return data;
};