import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AuthCallback from './components/AuthCallback';
import Dashboard from './components/Dashboard';


const App: React.FC = () => {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Other routes go here */}
          </Routes>
      </Router>
  );
};

export default App;
