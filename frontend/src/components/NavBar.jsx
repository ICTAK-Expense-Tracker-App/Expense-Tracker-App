import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isLoggedIn, handleLogout }) => {
  const [buttonColor, setButtonColor] = useState(localStorage.getItem('buttonColor') || 'green');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('buttonColor', buttonColor);
  }, [buttonColor]);

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <div>
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          <div className="spacer" />
          
          {!isLoggedIn ? (
            <>
            <Button component={Link} to="/" variant="contained" className="customButton">Home</Button>
              <Button component={Link} to="/Login" variant="contained" className="customButton">Login</Button>
              <Button component={Link} to="/SignUp" variant="contained" className="customButton">Sign Up</Button>
            </>
          ) : (
            <>
              
              <Button variant="contained" className="customButton" onClick={handleLogoutClick}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
