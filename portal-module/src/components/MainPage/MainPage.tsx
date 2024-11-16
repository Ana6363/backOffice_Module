import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './MainPage.css';

interface WelcomePageProps {
  menuItems: { id: number; name: string; route: string }[]; // Accept menu items as a prop
}

const WelcomePage: React.FC<WelcomePageProps> = ({ menuItems }) => {
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
