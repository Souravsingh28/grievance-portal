
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SwapnaDashboard from './components/SwapnaDashboard';
import SouravDashboard from './components/SouravDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('grievanceUser');
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login setUser={setUser} /> : user === 'swapna' ? <Navigate to="/swapna" /> : <Navigate to="/sourav" />} />
        <Route path="/swapna" element={user === 'swapna' ? <SwapnaDashboard /> : <Navigate to="/" />} />
        <Route path="/sourav" element={user === 'sourav' ? <SouravDashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
