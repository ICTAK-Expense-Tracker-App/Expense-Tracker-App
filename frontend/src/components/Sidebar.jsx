import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ handleOptionSelect }) => {
  return (
    <div className="sidebar">
      <div className="user-profile">
        <h2>User Name</h2>
      </div>
      <div className="sidebar-buttons">
        <Button
          onClick={() => handleOptionSelect('profile')}
          component={Link}
          to="/profile"
          className="customButton"
        >
          Profile
        </Button>
        <Button
          onClick={() => handleOptionSelect('income')}
          component={Link}
          to="/dashboard"
          className="customButton"
        >
          Income/Expenses
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
