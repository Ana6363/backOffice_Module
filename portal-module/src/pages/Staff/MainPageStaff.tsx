import React from 'react';
import WelcomePage from '../../components/MainPage/MainPage';

const StaffWelcome = () => {
  const staffMenuItems = [
    { id: 1, name: 'Main Page', route: '/mainPageStaff' },
    { id: 2, name: 'Operations Request', route: '/staff' },
  ];

  return <WelcomePage menuItems={staffMenuItems} />;
};

export default StaffWelcome;


