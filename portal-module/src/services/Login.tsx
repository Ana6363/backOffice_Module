import React from 'react';

const Login: React.FC = () => {
    const handleLogin = () => {
        // Redirect to the backend's login endpoint, which will redirect to Google IAM
        window.location.href = 'http://localhost:5184/api/v1/auth/login';
    };

    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
