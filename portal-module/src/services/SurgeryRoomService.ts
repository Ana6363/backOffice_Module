const API_URL = 'http://localhost:5184/api/v1/surgeryRoom';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const fetchSurgeryRooms = async () => {
    try {
        const response = await fetch(`${API_URL}/GetAllSurgeryRooms`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) throw new Error('Failed to fetch surgery rooms');

        const data = await response.json();
        return data.surgeryRooms || [];
    } catch (error) {
        console.error('Error fetching surgery rooms:', error);
        throw new Error('Failed to fetch surgery rooms');
    }
};

// Método para atualizar o status de uma sala
export const updateSurgeryRoomStatus = async (roomId: string, status: string) => {
    try {
        const response = await fetch(`${API_URL}/updateStatus`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ roomId, status }),
        });

        if (!response.ok) throw new Error('Failed to update surgery room status');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating surgery room status:', error);
        throw new Error('Failed to update surgery room status');
    }
};

// Supondo que a função fetchSurgeryRooms já tenha sido definida no serviço.

let surgeryRoomInterval: NodeJS.Timeout | null = null;

// Função para atualizar a matriz com base no status da sala
const updateRoomMatrix = (statusData: any, matrix: number[][]) => {
    statusData.forEach((room: any) => {
        const { roomId, status } = room; // Aqui assumimos que roomId e status são parte do objeto retornado

        // Converter roomId em coordenadas de matriz (row, col)
        const roomCoordinates = convertRoomIdToCoordinates(roomId);

        if (status === 'occupied') {
            matrix[roomCoordinates.row][roomCoordinates.col] = 7; // Se ocupado
        } else if (status === 'available') {
            matrix[roomCoordinates.row][roomCoordinates.col] = 6; // Se disponível
        }
    });
};

// Função para chamar o endpoint e obter todas as salas de cirurgia
export const monitorSurgeryRooms = (matrix: number[][]) => {
    if (surgeryRoomInterval) clearInterval(surgeryRoomInterval); // Limpar intervalo anterior se existir

    surgeryRoomInterval = setInterval(async () => {
        try {
            const surgeryRooms = await fetchSurgeryRooms();  // Obter status de todas as salas
            updateRoomMatrix(surgeryRooms, matrix);  // Atualizar a matriz
            console.log('Matriz de cirurgia atualizada com sucesso');
        } catch (error) {
            console.error('Erro ao monitorar as salas de cirurgia:', error);
        }
    }, 60000);  // Monitoramento a cada 60 segundos (1 minuto)
};

// Função para converter roomId em coordenadas (isso depende de como o seu ID é gerado, por exemplo, pode ser baseado no índice ou outros parâmetros)
const convertRoomIdToCoordinates = (roomId: string) => {
    // Aqui estamos apenas fazendo um exemplo de conversão de um id simples para coordenadas
    const row = parseInt(roomId.split('-')[0]);
    const col = parseInt(roomId.split('-')[1]);

    return { row, col };
};

