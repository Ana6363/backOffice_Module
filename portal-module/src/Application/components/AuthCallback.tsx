import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Capture the token from the URL
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');

        if (token) {
            // Store the JWT token in localStorage
            localStorage.setItem('token', token);
            console.log("Token received and stored:", token);

            // Redirect to the dashboard
            navigate('/dashboard', { replace: true });
        } else {
            console.error('No token found in URL');
            navigate('/login'); // Redirect to login if no token is found
        }
    }, [navigate, location]);

    return <div>Authenticating...</div>;
};

export default AuthCallback;
