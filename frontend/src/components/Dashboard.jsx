import React, { useState } from 'react';
import './Dashboard.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="user-profile">
          <h2>User Name</h2>
        </div>
        <div className="sidebar-buttons">
        <Button onClick={() => handleOptionSelect('profile')} component={Link} to="/profile"  className="customButton">Profile</Button>
        <br />
        <Button onClick={() => handleOptionSelect('income')} component={Link} to="/dashboard"  className="customButton">Income/Expenses</Button>
        </div>
      </div>
      <div className="dashboard-content">
        {selectedOption === 'profile' && <h2>Profile</h2>}
        {selectedOption === 'income' && <h2>Income/Expenses</h2>}
      </div>
    </div>
  );
};

export default Dashboard;
