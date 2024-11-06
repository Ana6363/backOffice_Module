import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('token', token);

            console.log("Token received and stored in localStorage:", token);
            navigate('/dashboard', { replace: true });
        } else {
            console.error("No token found in URL");
        }
    }, [navigate, location]);

    return <div>Welcome to the Dashboard!</div>;
};

export default Dashboard;
