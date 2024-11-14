import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPage: React.FC = () => {
    return (
        <div>
            <h1>Admin Page</h1>
            <nav>
                <ul>
                    <li><Link to="patient">Patient</Link></li>
                    <li><Link to="staff">Staff</Link></li>
                    <li><Link to="oprequest">Op Request</Link></li>
                </ul>
            </nav>
            <Outlet /> {/* This will render either the index route or a child route */}
        </div>
    );
};

export default AdminPage;
