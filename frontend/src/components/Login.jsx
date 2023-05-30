// Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for Login component
import Logb from '../assets/Logb.jpg'; // Import the image
import TextField from '@mui/material/TextField'; // Import TextField component from MUI

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., send login request to server)

    // Reset the form
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={Logb} alt="Logo" className="login-logo" />
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <h4>Welcome Back! Please enter your details.</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              label="Email"
              variant="standard"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              variant="standard"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="#" className="black-link">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">Log in</button>
        </form>
        <div className="signup-link">
          <span>Don't have an account?</span>
          <a href="#" className="black-link">Sign up for free</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
