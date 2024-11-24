import React from 'react';
import WelcomePage from '../../components/MainPage/MainPage';

const PatientWelcome = () => {
  const patientMenuItems = [
    { id: 1, name: 'Main Page', route: '/mainPagePatient' },
    { id: 2, name: 'My Account', route: '/patient' },
    { id: 3, name: 'Update Account', route: '/patient/update' },
    { id: 4, name: 'Delete Account', route: '/patient/delete' },
  ];

  return <WelcomePage menuItems={patientMenuItems} />;
};

export default PatientWelcome;

