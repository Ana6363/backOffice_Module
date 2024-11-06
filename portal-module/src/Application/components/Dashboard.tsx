import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Define the JWT payload structure to match the token claims
type JwtPayload = {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    exp: number;
    iss: string;
    aud: string;
};

const TokenTest: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                console.log("Decoded token:", decoded);

                // Extract role and email
                const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
                console.log("User role:", role);
                console.log("User email:", email);

                if (role === 'Admin') {
                    navigate('/admin', { replace: true });
                } else if (role === 'Patient') {
                    navigate('/patient', { replace: true });
                } else {
                    navigate('/staff', { replace: true });
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate('/login');
            }
        } else {
            console.error("No token found in localStorage");
            navigate('/login');
        }
    }, [navigate]);

    return <div>Testing Token Decoding</div>;
};

export default TokenTest;
