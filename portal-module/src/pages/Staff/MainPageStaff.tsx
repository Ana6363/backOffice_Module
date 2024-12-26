import React from 'react';
import WelcomePage from '../../components/MainPage/MainPage';

const StaffWelcome = () => {
  const staffMenuItems = [
    { id: 1, name: 'Main Page', route: '/mainPageStaff' },
    { id: 2, name: 'Operations Request', route: '/operationRequest' },
    { id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel' },
    { id: 3, name: 'Manage Appointments', route: '/appointments' },
    { id: 4, name: 'Search Allergies', route: '/allergies' }
  ];

  return (<WelcomePage menuItems={staffMenuItems} />);
};

export default StaffWelcome;


