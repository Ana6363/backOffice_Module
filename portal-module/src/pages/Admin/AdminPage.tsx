import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for proper navigation
import WelcomePage from '../../components/MainPage/MainPage';

const AdminPage = () => {
  // Define the menu items with correct routes
  const adminMenuItems = [
    { id: 1, name: 'Main Page', route: '/admin' }, // Main page route
    { id: 2, name: 'Manage Patients', route: '/admin/patient' }, // Absolute path for patients
    { id: 3, name: 'Manage Staff', route: '/admin/staff' }, // Absolute path for staff
    { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' }, // Absolute path for operation types
  ];

  return (
    <>
      <WelcomePage 
        menuItems={adminMenuItems} // Pass the menu items to the WelcomePage component
      />
      <div>
        {/* Render the menu with links for navigation */}
        <nav>
          <ul>
            {adminMenuItems.map((item) => (
              <li key={item.id}>
                <Link to={item.route}>{item.name}</Link> {/* Use Link for proper navigation */}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminPage;
