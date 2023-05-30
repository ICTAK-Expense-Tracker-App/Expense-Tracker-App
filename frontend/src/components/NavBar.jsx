import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css';
import './Home.jsx';

const NavBar = () => {
  return (
    <div>
        <AppBar position="static" className="navbar">
            <Toolbar>
            <Button component={Link} to='/Login' variant='contained' className='customButton'>Login</Button>
            <Button component={Link} to='/SignUp' variant='contained' className='customButton'>Sign Up</Button>
            <Button component={Link} to='/Home' variant='contained' className='customButton'>Home</Button>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default NavBar