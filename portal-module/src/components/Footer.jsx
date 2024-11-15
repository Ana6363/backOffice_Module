import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by Group47</p>
      </aside>
    </footer>
  );
};

export default Footer;