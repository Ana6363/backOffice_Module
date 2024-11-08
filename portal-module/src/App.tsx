import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from './services/Login';
import AuthCallback from './services/AuthCallback';
import Dashboard from './services/Dashboard';
import AdminPage from './components/AdminPage';
import AdminStaff from './components/AdminStaff';

const AdminDefault: React.FC = () => (
    <div>Welcome to the Admin Dashboard. Please select a tab above.</div>
);

const App: React.FC = () => {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/*" element={<AdminPage />}>
                    <Route index element={<AdminDefault />} />
                    {/* TODO <Route path="patient" element={<Patient />} /> */}
                    <Route path="staff" element={<AdminStaff />} />
                    {/* TODO <Route path="oprequest" element={<OpRequest />} /> */}
              </Route>
          </Routes>
      </Router>
  );
};

export default App;
