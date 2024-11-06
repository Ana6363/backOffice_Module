import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Application/components/Login';
import AuthCallback from './Application/components/AuthCallback';
import Dashboard from './Application/components/Dashboard';


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
