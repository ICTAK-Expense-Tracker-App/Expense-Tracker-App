import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css'
const Sidebar = ({ handleOptionSelect }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://localhost:9002/profile');
        const userData = response.data.user;
        setUsername(userData.name);
      } catch (error) {
        console.error('Error occurred while fetching user profile:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="sidebar">
      <div className="user-profile">
      
        <span>{username}</span>
      </div>
      <div className="sidebar-buttons"><br />
        <br />
        <Button
          onClick={() => handleOptionSelect('profile')}
          component={Link}
          to="/profile"
          className="customButton1"
        >
          Profile
        </Button>
        <br /><br />
        <Button
          onClick={() => handleOptionSelect('income')}
          component={Link}
          to="/dashboard"
          className="customButton1"
        >
          Income/Expenses
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
