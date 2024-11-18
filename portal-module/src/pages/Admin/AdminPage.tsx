import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import WelcomePage from '../../components/MainPage/MainPage';

const AdminPage = () => {
    const adminMenuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
        { id: 2, name: 'Manage Patients', route: 'patient' },
        { id: 3, name: 'Manage Staff', route: 'staff' },
        { id: 4, name: 'Manage Operation Types', route: 'opTypes' },
      ];
    
      return <WelcomePage menuItems={adminMenuItems} />;
};

export default AdminPage;



