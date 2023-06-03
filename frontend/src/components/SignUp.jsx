import React from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, FormControlLabel} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { CheckBox } from '@mui/icons-material';
import './SignUp.css'
import back from '../assets/back.jpg';
import './SignUp.css';

const SignUp = () => {
    const paperStyle = { padding: 15, width: 500, margin: "0 auto" };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#1bbd7e' };

    return (
      
        <Grid className='Sig' container justify="center">
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5' style={headerStyle}>Sign Up</Typography>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your name" />
                    <TextField fullWidth label='Place' placeholder="Enter your place" />
                    <TextField fullWidth label='Age' placeholder="Enter your age" />
                    <TextField fullWidth label='Email' placeholder="Enter your email" />
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" />
                    <TextField fullWidth label='Password' placeholder="Enter your password" type="password" />
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" type="password" />
                    
                    <FormControlLabel
                        control={<CheckBox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <br />
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                    <div className="signup-link">
                        <span>Already have an account?</span>
                        <a href="http://localhost:3000/Login" className="black-link">Login to your account</a>
                    </div>
                </form>
            </Paper>
        </Grid>
    );
}

export default SignUp;