import React, { useState, useEffect } from 'react';
import { fetchSurgeryRooms, monitorRooms } from '../../services/SurgeryRoomService';
import './StaffPage.css';
import Button from '../../components/Buttons/Buttons'; 
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const StaffPage: React.FC = () => {
    const [surgeryRooms, setSurgeryRooms] = useState<any[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

    // Função para buscar as salas de cirurgia da API
    const loadSurgeryRooms = async () => {
        try {
            const rooms = await fetchSurgeryRooms(); // Chama a API para buscar as salas
            setSurgeryRooms(rooms);
        } catch (error) {
            console.error('Error fetching surgery rooms:', error);
        }
    };

    // Função para inicializar a monitoração das salas de cirurgia
    const startMonitoringRooms = () => {
        // Inicia o monitoramento a cada minuto
        monitorRooms({
            updateRoomStatus: (roomId: string, status: string) => {
                // Atualiza o estado das salas na UI
                setSurgeryRooms((prevRooms) =>
                    prevRooms.map((room) =>
                        room.roomId === roomId ? { ...room, status } : room
                    )
                );
            }
        });
    };

    // Atualiza o estado das salas de cirurgia a cada minuto
    useEffect(() => {
        loadSurgeryRooms(); // Carrega as salas inicialmente
        const intervalId = setInterval(startMonitoringRooms, 60000); // Inicia o monitoramento contínuo a cada minuto

        // Limpa o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
    }, []);

    // Função para navegar para o modelo 3D
    const navigateTo3D = () => {
        window.location.href = 'http://127.0.0.1:5500/portal-module/src/3DModel/Thumb_Raiser.html';
    };

    const staffMenuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
        { id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel' },
      ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={staffMenuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Surgery Rooms</h1>

                   {/* Botão para abrir o modelo 3D */}
                   <div className="button-container">
                        <Button
                            className="button button-secondary"
                            onClick={navigateTo3D} // Chamando o método
                        >
                            Open 3D Project
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StaffPage;
