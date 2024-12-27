import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createMedicalConditions} from "../../../services/MedicalConditionsService";
import {MedicalConditionsCreateDto} from "../../../dtos/MedicalConditionsDto";
import Button from "../../../components/Buttons/Buttons";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";


const CreateMedicalConditions: React.FC = () => {
    const navigate = useNavigate();

    const [medicalConditionsData, setMedicalConditionsData] = useState<MedicalConditionsCreateDto>({
        name: '',
        description: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setMedicalConditionsData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await createMedicalConditions(medicalConditionsData);
            alert('Medical Condition created successfully');
            navigate('/admin/medicalConditions');
        } catch (error) {
            console.error('Error creating medical condition:', error);
            setError('Error creating medical condition. Please try again.');
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
            <Navbar menuItemsProp={menuItems}/>
            <main className="main-content">
                <div className="container">
                    <h1 className="text-3xl font-bold text-center mb-8">Create New Medical Condition</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="medical-conditions-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={medicalConditionsData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={medicalConditionsData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" className= "button button-primary">Create Medical Condition</Button>
                    </form>
                </div>
            </main>
            <Footer/>
        </div>
    );

}

export default CreateMedicalConditions;
