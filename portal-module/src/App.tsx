import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './services/Login';
import AuthCallback from './services/AuthCallback';
import Dashboard from './services/Dashboard';
import AdminPage from './components/AdminPage';
import AdminStaff from './components/AdminStaff';
import AdminPatient from './components/AdminPatient';
import Patient from './components/Patient';

const AdminDefault: React.FC = () => (
    <div>Welcome to the Admin Dashboard. Please select a tab above.</div>
);

const App: React.FC = () => {
  return (
      <Router>
          <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/*" element={<AdminPage />}>
                    <Route index element={<AdminDefault />} />
                    {<Route path="patient" element={<AdminPatient />} />}
                    <Route path="staff" element={<AdminStaff />} />
                    {/* TODO <Route path="oprequest" element={<OpRequest />} /> */}
              </Route>
              <Route path="/patient" element={<Patient/>} />
          </Routes>
      </Router>
  );
};

export default App;
