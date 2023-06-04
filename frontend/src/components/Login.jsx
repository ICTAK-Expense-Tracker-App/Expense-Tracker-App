// Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for Login component
import Logb from '../assets/Logb.jpg'; // Import the image
import TextField from '@mui/material/TextField'; // Import TextField component from MUI
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import { Link } from 'react-router-dom';

const Login = ({ setLoginUser}) => {
  const navigate = useNavigate();

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const login = () => {
      axios.post("http://localhost:9002/Login", user)
      .then(res => {
          alert(res.data.message)
          setLoginUser(res.data.user)
          navigate("/")
      })
  }
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={Logb} alt="Logo" className="login-logo" />
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <h4>Welcome Back! Please enter your details.</h4>
        <form>
          <div className="form-group">
            <TextField
              label="Email"
              variant="standard"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              variant="standard"
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="#" className="black-link">Forgot Password?</a>
          </div><br />
          <button type="submit" className="login-button" onClick={login}>Log in</button>
        </form>
        <div className="signup-link">
          <span>Don't have an account?</span>
          <a href="http://localhost:3000/SignUp" className="black-link">Sign up for free</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
