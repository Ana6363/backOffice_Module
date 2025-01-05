import React from 'react';
import './LoginPage.css';
 
const Login: React.FC = () => {
  const handleLogin = () => {
    // Redireciona para o backend para autenticação com Google
    window.location.href = 'https://api-dotnet.hospitalz.site/api/v1/auth/login';
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo">
          <img src="/images/Logo.jpg" alt="Logo" />
        </div>
        <h1>Welcome to Hospital G47 Portal</h1>
        <p>Please log in to access your account.</p>

        <div className="login-form">
          <button className="google-login-button" onClick={handleLogin}>
            <img
              src="/images/googleIcon.png"
              alt="Google Icon"
              className="google-icon"
            />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
