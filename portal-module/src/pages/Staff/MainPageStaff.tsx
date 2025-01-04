import React from 'react';
import WelcomePage from '../../components/MainPage/MainPage';

const StaffWelcome = () => {
  const menuItems = [
    { id: 1, name: 'Main Page', route: '/mainPageStaff' },
    { id: 2, name: 'Operations Request', route: '/operationRequest' },
    { id: 3, name: 'Surgery Room 3DModel', route: '/surgeryRoom3DModel' },
    { id: 3, name: 'Manage Appointments', route: '/appointments' },
    { id: 4, name: 'Search Allergies', route: '/allergies' },
    { id: 5, name: 'Search Medical Conditions', route: '/medicalConditions' },
    { id: 6, name: 'Manage Patient Medical Record', route: '/patientMedicalRecord' }
  ];

  return (<WelcomePage menuItems={menuItems} />);
};

export default StaffWelcome;


