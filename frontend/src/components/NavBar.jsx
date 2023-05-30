import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        <AppBar>
            <Toolbar>
            <Button component={Link} to='/Login' variant='contained'>Login</Button>
          <Button component={Link} to='/SignUp' variant='contained'>Sign Up</Button>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default NavBar