import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [buttonColor, setButtonColor] = useState(localStorage.getItem('buttonColor') || 'green');

  useEffect(() => {
    localStorage.setItem('buttonColor', buttonColor);
  }, [buttonColor]);

  return (
    <div>
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          <div className="spacer" />
          <Button
            component={Link}
            to="/Login"
            variant="contained"
            className="customButton"
            style={{ backgroundColor: buttonColor }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/SignUp"
            variant="contained"
            className="customButton"
            style={{ backgroundColor: buttonColor }}
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/"
            variant="contained"
            className="customButton"
            style={{ backgroundColor: buttonColor }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
