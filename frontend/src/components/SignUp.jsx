import React, { useState } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, FormControlLabel } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { CheckBox } from '@mui/icons-material';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import mainImage from "../assets/main.jpg";
import main from "../assets/main.jpg";

const SignUp = () => {
  const paperStyle = { padding: 15, width: '70%', margin: '0 auto' };
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
    education: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEmailValidation = (password, reEnterPassword) => {
    axios
      .get('http://localhost:9002/checkEmail', { params: { email: user.email } })
      .then((res) => {
        if (res.data.exists) {
          alert('Email is already registered. Please use a different email.');
        } else {
          alert(res.data.message);
          if (user.name && user.email && user.password && password === reEnterPassword) {
            axios
              .post('http://localhost:9002/SignUp', user)
              .then((res) => {
                alert(res.data.message);
                navigate('/Login');
              })
              .catch((err) => {
                console.log('Error occurred while registering user:', err);
                alert('Failed to register user. Please try again later.');
              });
          } else {
            setFormError('Please fill in all the required fields and make sure the passwords match.');
          }
        }
      })
      .catch((err) => {
        console.log('Error occurred while checking email:', err);
        alert('Email is already registered. Please use a different email.');
      });
  };

  const handleUserRegistration = async (password, reEnterPassword) => {
    try {
      if (user.name && user.email && user.password && password === reEnterPassword) {
        await axios.post('http://localhost:9002/SignUp', user);
        alert('User registered successfully');
        navigate('/Login');
      } else {
        setFormError('Please fill in all the required fields and make sure the passwords match.');
      }
    } catch (error) {
      console.log('Error occurred while registering user:', error);
      alert('Failed to register user. Please try again later.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { password, reEnterPassword } = user;

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be 8 characters long and contain at least one special character and one numeric value.'
      );
      return;
    }

    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(user.no)) {
      alert('Phone number must be 10 digits long');
      return;
    }

    handleEmailValidation(password, reEnterPassword);
  };

  return (
    <div className="page-container" style={{ backgroundImage: `url(${main})` }}>
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={6}>
        <Paper style={paperStyle}>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <Typography variant="h5" style={headerStyle}>
            Sign Up
          </Typography>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account!
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={user.name}
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Place"
              name="place"
              value={user.place}
              placeholder="Enter your place"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Education"
              name="education"
              value={user.education}
              placeholder="Enter your education"
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
              required
            />
            {emailError && (
              <Typography variant="caption" color="error" gutterBottom>
                {emailError}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Phone Number"
              name="no"
              value={user.no}
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={user.password}
              placeholder="Enter your password"
              type="password"
              onChange={handleChange}
              required
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
              required
            />
            <FormControlLabel
              control={<CheckBox name="checkedA" />}
              label="I accept the terms and conditions."
            />
            {formError && (
              <Typography variant="caption" color="error" gutterBottom>
                {formError}
              </Typography>
            )}
            <br />
            <Button type="submit" variant="contained" color="primary" className="submit-button">
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
      <Grid item xs={6}>
        <div className="image-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <img src={mainImage} alt="Image" className="background-image" style={{ width: '600px', height: '500px', objectFit: 'cover' }} />
        </div>
      </Grid>
    </Grid>
    </div>
  );
};

export default SignUp;
