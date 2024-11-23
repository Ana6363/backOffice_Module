import React, { useState, useEffect } from 'react';
import { fetchSurgeryRooms, updateSurgeryRoomStatus } from '../../services/SurgeryRoomService';
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
            const rooms = await fetchSurgeryRooms();
            setSurgeryRooms(rooms);
        } catch (error) {
            console.error('Error fetching surgery rooms:', error);
        }
    };

    // Atualiza o estado das salas de cirurgia a cada minuto
    useEffect(() => {
        loadSurgeryRooms(); // Carrega as salas inicialmente

        const interval = setInterval(() => {
            loadSurgeryRooms(); // Atualiza a cada minuto
        }, 60000); // 60000ms = 1 minuto

        return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    }, []);

    // Função para modificar o estado de uma sala de cirurgia
    const handleUpdateRoomStatus = async (roomId: string, newStatus: string) => {
        try {
            await updateSurgeryRoomStatus(roomId, newStatus);
            setSurgeryRooms((prevRooms) =>
                prevRooms.map((room) =>
                    room.id === roomId ? { ...room, status: newStatus } : room
                )
            );
        } catch (error) {
            console.error('Error updating surgery room status:', error);
        }
    };
    const navigateTo3D = () => {
        window.location.href =
            'http://127.0.0.1:5500/portal-module/src/3DModel/Thumb_Raiser.html';
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
