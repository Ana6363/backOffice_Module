import React from 'react';
import WelcomePage from '../../components/MainPage/MainPage'; // Ensure this component properly displays menu items with links

const AdminPage = () => {
  // Define the menu items with correct routes
  const adminMenuItems = [
    { id: 1, name: 'Main Page', route: '/admin' },
    { id: 2, name: 'Manage Patients', route: '/admin/patient' },
    { id: 3, name: 'Manage Staff', route: '/admin/staff' },
    { id: 4, name: 'Manage Operation Types', route: '/admin/opTypes' },
    { id: 5, name: 'Schedule Surgeries', route: '/admin/schedule' },
    { id: 6, name: 'Manage Surgery Rooms', route: '/admin/surgeries' },
    { id: 7, name: 'Manage Specializations', route: '/admin/specializations' },
    { id: 8, name: 'Manage Room Types', route: '/admin/roomtypes' },
    { id: 9, name: 'Manage Allergies', route: '/admin/allergies' }
];

  return (
    // Pass the menu items to the WelcomePage component for rendering
    <WelcomePage menuItems={adminMenuItems} />
  );
};

export default AdminPage;