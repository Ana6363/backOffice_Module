import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by Group47</p>
      </aside>
    </footer>
  );
};

export default Footer;

