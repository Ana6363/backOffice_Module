import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRoomType } from '../../../services/RoomTypeService';
import Button from '../../../components/Buttons/Buttons';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';

const CreateRoomType: React.FC = () => {
    const navigate = useNavigate();

    const [roomTypeData, setRoomTypeData] = useState({
        InternalCode: '',
        Designation: '',
        Description: '',
        SurgerySuitability: '', // Campo atualizado para dropdown
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRoomTypeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await addRoomType(roomTypeData);
            alert('Room Type created successfully');
            navigate('/admin/roomtypes');
        } catch (error) {
            console.error('Error creating room type:', error);
            setError('Error creating room type. Please try again.');
        }
    };

    const menuItems = [
        {id: 1, name: 'Main Page', route: '/admin'},
        {id: 2, name: 'Manage Patients', route: '/admin/patient'},
        {id: 3, name: 'Manage Staff', route: '/admin/staff'},
        {id: 4, name: 'Manage Operation Types', route: '/admin/opTypes'},
        {id: 5, name: 'Schedule Surgeries', route: '/admin/schedule'},
        {id: 6, name: 'Manage Surgery Rooms', route: '/admin/surgeries'},
        {id: 7, name: 'Manage Specializations', route: '/admin/specializations'},
        {id: 8, name: 'Manage Room Types', route: '/admin/roomtypes'},
        {id: 9, name: 'Manage Allergies', route: '/admin/allergies'},
        {id: 10, name: 'Manage Medical Conditions', route: '/admin/medicalConditions'},
    ];
    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Room Type</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="room-type-form">
                        <div className="form-group">
                            <label htmlFor="internalCode">Internal Code</label>
                            <input
                                type="text"
                                id="internalCode"
                                name="InternalCode"
                                value={roomTypeData.InternalCode}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="designation">Designation</label>
                            <input
                                type="text"
                                id="designation"
                                name="Designation"
                                value={roomTypeData.Designation}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="Description"
                                value={roomTypeData.Description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="surgerySuitability">Surgery Suitability</label>
                            <select
                                id="surgerySuitability"
                                name="SurgerySuitability"
                                value={roomTypeData.SurgerySuitability}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Surgery Suitability</option>
                                <option value="SUITABLE">SUITABLE</option>
                                <option value="NOTSUITABLE">NOTSUITABLE</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <Button type="submit" className="button button-primary">
                                Create Room Type
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreateRoomType;
