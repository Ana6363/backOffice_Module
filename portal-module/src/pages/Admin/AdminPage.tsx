import React from 'react';
import WelcomePage from '../../components/MainPage/MainPage'; // Ensure this component properly displays menu items with links

const AdminPage = () => {
  // Define the menu items with correct routes
  const adminMenuItems = [
    { id: 1, name: 'Main Page', route: '/admin' }, // Main page route
    { id: 2, name: 'Manage Patients', route: '/admin/patient' }, // Absolute path for patients
    { id: 3, name: 'Manage Staff', route: '/admin/staff' }, // Absolute path for staff
    { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' }, // Absolute path for operation types
    { id: 5, name: 'Schedule Surgeries', route: '/admin/schedule' }, // Absolute path for operation types
    { id: 6, name: 'Manage Surgery Rooms', route: '/admin/surgeries' }, // Absolute path for operation types

  ];

  return (
    // Pass the menu items to the WelcomePage component for rendering
    <WelcomePage menuItems={adminMenuItems} />
  );
};

export default AdminPage;