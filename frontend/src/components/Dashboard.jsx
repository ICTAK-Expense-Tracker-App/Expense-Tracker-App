import React, { useState } from 'react';
import './Dashboard.css';
import { Button } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from './Profile';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dashboard-container">
      <Sidebar handleOptionSelect={handleOptionSelect} />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<h2>Welcome to the Dashboard</h2>} />
          <Route path="/dashboard" element={<h2>Income/Expenses</h2>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
