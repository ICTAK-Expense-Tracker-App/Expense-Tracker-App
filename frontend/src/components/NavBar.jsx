import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Make sure the CSS file is correctly imported

const NavBar = () => {
  return (
    <div>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Button component={Link} to="/Login" variant="contained" className="customButton">
            Login
          </Button>
          <Button component={Link} to="/SignUp" variant="contained" className="customButton">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
