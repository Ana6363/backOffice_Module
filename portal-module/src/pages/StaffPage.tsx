import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const StaffPage: React.FC = () => {
    return (
        <div>
            <h1>Staff Page</h1>
            <nav>
                <ul>
                    <li><Link to="opRequest">Operation Requests</Link></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default StaffPage;
