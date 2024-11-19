import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './MainPage.css';

interface WelcomePageProps {
  menuItems: { id: number; name: string; route: string }[]; // Menu items for navigation
}

const WelcomePage: React.FC<WelcomePageProps> = ({ menuItems }) => {
  return (
    <div className="main-page">
      {/* Navbar receives the menuItems for navigation */}
      <Navbar menuItemsProp={menuItems} />
      

      <div className="welcome-container">
        <div className="welcome-content">
          {/* Image Section */}
          <div className="welcome-image">
            <img src="/images/Logo.jpg" alt="Healthcare Facility Logo" />
          </div>

          {/* Welcome Message */}
          <div className="welcome-text">
            <h1>Welcome to Your Healthcare Facility!</h1>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default WelcomePage;
