import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'

const NavBar = () => {
  return (
    <div>
        <AppBar>
            <Toolbar>
                <Button variant='contained'>Login</Button>
                <Button variant='contained'>Sign Up</Button>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default NavBar