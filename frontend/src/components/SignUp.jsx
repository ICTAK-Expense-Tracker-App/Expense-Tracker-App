import React, { useState } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, FormControlLabel } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { CheckBox } from '@mui/icons-material';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const paperStyle = { padding: 15, width: 500, margin: '0 auto' };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    place: '',
    age: '',
    email: '',
    no: '',
    password: '',
    reEnterPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { password, reEnterPassword } = user;

    // Password constraints validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be 8 characters long and contain at least one special character and one numeric value.'
      );
      return;
    }

    // Rest of the form submission logic
    if (user.name && user.email && user.password && password === reEnterPassword) {
      axios
        .post('http://localhost:9002/SignUp', user)
        .then((res) => {
          alert(res.data.message);
          navigate('/Profile', { state: user }); // Pass user object as state
        })
        .catch((err) => console.log(err));
    } else {
      alert('Invalid Input');
    }
  };

  return (
    <Grid className="Sig" container justifyContent="center">
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <Typography variant="h5" style={headerStyle}>
            Sign Up
          </Typography>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account!
          </Typography>
        </Grid>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Place"
            name="place"
            value={user.place}
            placeholder="Enter your place"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={user.age}
            placeholder="Enter your age"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="no"
            value={user.no}
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={user.password}
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
          />
          {passwordError && (
            <Typography variant="caption" color="error" gutterBottom>
              {passwordError}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Confirm Password"
            name="reEnterPassword"
            value={user.reEnterPassword}
            placeholder="Confirm your password"
            type="password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<CheckBox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
          <div className="signup-link">
            <span>Already have an account?</span>
            <a href="http://localhost:3000/Login" className="black-link">
              Login to your account
            </a>
          </div>
        </form>
      </Paper>
    </Grid>
  );
          
};
export default SignUp  