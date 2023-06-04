import React, { useState } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, FormControlLabel} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { CheckBox } from '@mui/icons-material';
import './SignUp.css'
import back from '../assets/back.jpg';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const paperStyle = { padding: 15, width: 500, margin: "0 auto" };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const navigate = useNavigate();
    const [ user, setUser] = useState({
        name: "",
        place:"",
        age:"",
        email:"",
        no:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const SignUp = () => {
        const { name, place, age ,email, no ,password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then( res => {
                alert(res.data.message)
                navigate("/Login")
            })
        } else {
            alert("Invalid Input")
        }
    }

    return (
      
        <Grid className='Sig' container justify="center">
            {console.log("User", user)}
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5' style={headerStyle}>Sign Up</Typography>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' name='name' value={user.name} placeholder="Enter your name" onChange={ handleChange }/>
                    <TextField fullWidth label='Place' name='place' value={user.place} placeholder="Enter your place" onChange={ handleChange }/>
                    <TextField fullWidth label='Age' name='age' value={user.age} placeholder="Enter your age" onChange={ handleChange } />
                    <TextField fullWidth label='Email' name='email' value={user.email} placeholder="Enter your email" onChange={ handleChange }/>
                    <TextField fullWidth label='Phone Number' name='no' value={user.no} placeholder="Enter your phone number" onChange={ handleChange }/>
                    <TextField fullWidth label='Password' name='password' value={user.password} placeholder="Enter your password" type="password" onChange={ handleChange }/>
                    <TextField fullWidth label='Confirm Password' name='reEnterPassword' value={user.reEnterPassword} placeholder="Confirm your password" type="password" onChange={ handleChange }/>
                    
                    <FormControlLabel
                        control={<CheckBox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <br />
                    <Button type='submit' variant='contained' color='primary' onClick={SignUp}>Sign up</Button>
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