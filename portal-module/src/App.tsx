import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './services/Login';
import AuthCallback from './services/AuthCallback';
import Dashboard from './services/Dashboard';
import MainPagePatient from './pages/Patient/MainPagePatient';
import AdminPage from './pages/Admin/AdminPage';
import AdminStaff from './pages/AdminStaff';
import AdminPatient from './pages/Admin/AdminPatient/AdminPatient';

import AdminOpType from './pages/AdminOpType';
import Patient from './pages/Patient/Patient';
import PatientUpdate from './pages/Patient/PatientUpdate';
import PatientDelete from './pages/Patient/PatientDelete';
import StaffPage from './pages/StaffPage';
import OpRequest from './pages/OperationRequest';



// A component to check the user's role and grant or deny access to certain routes
interface ProtectedRouteProps {
    allowedRoles: string[];
    redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, redirectPath }) => {
    const userRole = localStorage.getItem('userRole');

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

const App: React.FC = () => {

    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');

    console.log("User role:", userRole);
    console.log("User email:", userEmail);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/dashboard" element={<Dashboard />} />


                {/* Admin routes protected for 'Admin' role only */}
                <Route element={<ProtectedRoute allowedRoles={['Admin']} redirectPath="/login" />}>
                    <Route path="/admin" element={<AdminPage />}>
                        <Route path="patient" element={<AdminPatient />} />
                        <Route path="staff" element={<AdminStaff />} />
                        <Route path="opType" element={<AdminOpType />} />
                    </Route>
                </Route>

                {/* Admin routes protected for 'Admin' role only */}
                <Route element={<ProtectedRoute allowedRoles={['Doctor','Nurse']} redirectPath="/login" />}>
                    <Route path="/staff" element={<StaffPage />}>
                        <Route path="opRequest" element={<OpRequest />} />
                    </Route>
                </Route>

                {/* Patient route protected for 'Patient' role only */}
                <Route element={<ProtectedRoute allowedRoles={['Patient']} redirectPath="/mainPagePatient" />}>
                    <Route path="/mainPagePatient" element={<MainPagePatient />} />
                    <Route path="/patient" element={<Patient />} />
                    <Route path="/patient/update" element={<PatientUpdate/>} />
                    <Route path="/patient/delete" element={<PatientDelete/>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
