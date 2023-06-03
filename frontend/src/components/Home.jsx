// Home.jsx file
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heyy from '../assets/heyy.jpg';

const Home = () => {
  return (
    <div className="homepage">
      <div className="content">
        <h1 className="home-heading">WELCOME TO EXPENSIO</h1>
        <p>Money Management made simple</p>

        <div className="buttons">
          <Link to="/Login" className="home-link">
            Login
          </Link>
          <Link to="/SignUp" className="home-link">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

