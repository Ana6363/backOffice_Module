// Definindo a URL base da API
const API_URL = 'http://localhost:5184/api/v1/surgeryRoom';

// Função para obter os cabeçalhos de requisição (com token de autorização)
// Mapeamento de roomId para as posições na matriz
const roomPositions = {
    'R001': [2, 1],
    'R002': [2, 4],
    'R003': [2, 7],
    'R004': [8, 1],
    'R005': [8, 4],
    'R006': [8, 7]
};

// Função para obter os cabeçalhos de requisição (com token de autorização)
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

// Função para buscar as salas de cirurgia da API
export const fetchSurgeryRooms = async () => {
    try {
        const response = await fetch(`${API_URL}/GetAllSurgeryRooms`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) throw new Error('Failed to fetch surgery rooms');

        const data = await response.json();
        return data.surgeryRooms || []; // Retorna as salas de cirurgia ou um array vazio se não houver dados
    } catch (error) {
        console.error('Error fetching surgery rooms:', error);
        throw new Error('Failed to fetch surgery rooms');
    }
};

// Função que simula a chamada ao endpoint de todas as salas
// Função para monitorar e atualizar o estado das salas de cirurgia
export const monitorRooms = (mazeInstance: any) => {
    setInterval(async () => {
        try {
            // Buscando todas as salas com o método fetchSurgeryRooms
            const rooms = await fetchSurgeryRooms();

            // Verificando o status de cada sala e atualizando o modelo 3D
            rooms.forEach((room: { roomId: keyof typeof roomPositions; status: string }) => {
                const { roomId, status } = room;

                console.log(`Checking status of room ${roomId}: ${status}`); // Log para debugar

                // Verificando se o roomId está mapeado nas posições
                if (roomPositions[roomId]) {
                    const [row, col] = roomPositions[roomId]; // Obtendo a posição da sala

                    console.log(`Room ${roomId} mapped to position: [${row}, ${col}]`); // Log para debugar

                    // Verificando se o status está correto e atualizando a célula no modelo 3D
                    if (status === 'Occupied') {
                        console.log(`Room ${roomId} is occupied. Updating matrix...`);
                        mazeInstance.updateRoomStatusAtPosition(row, col, 'Occupied'); // Atualiza a sala para "ocupado"
                    } else if (status === 'Available') {
                        console.log(`Room ${roomId} is available. Updating matrix...`);
                        mazeInstance.updateRoomStatusAtPosition(row, col, 'Available'); // Atualiza a sala para "livre"
                    }
                } else {
                    console.warn(`Room ${roomId} not found in roomPositions mapping.`);
                }
            });
        } catch (error) {
            console.error('Error monitoring rooms:', error);
        }
    }, 60000); // Atualiza a cada 1 minuto (60000 ms)
};



