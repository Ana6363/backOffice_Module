import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import '../MainPage/MainPage.css';

interface WelcomePageProps {}
const WelcomePage: React.FC<WelcomePageProps> = () => {
  const menuItems = [
    { id: 1, name: 'My Account', route: '/patient' },
    { id: 2, name: 'Update Account', route: '/patient/update' },
    { id: 3, name: 'Delete Account', route: '/patient/delete' },
    { id: 4, name: 'Main Page', route: '/mainPagePatient' },
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar menuItemsProp={menuItems} />

      <div className="welcome-container">
        <div className="welcome-content">
          {/* Image Container */}
          <div className="welcome-image">
            <img src="/images/Logo.jpg" alt="Logo" />
          </div>

          {/* Welcome Text */}
          <div className="welcome-text">
            <h1>Welcome To Your Healthcare Facility!</h1>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WelcomePage;
