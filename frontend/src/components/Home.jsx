// Home.jsx file
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heyy from '../assets/heyy.jpg';

const Home = () => {
  return (
    <div className="homepage">
      <div className="content">
        <h1 className="home-heading">WELCOME TO HOME PAGE</h1>
        <p>Here you can View and Manage your Income and Expenses.</p>

        <div className="buttons">
          <Link to="/AddNew" className="home-link">
            Add New
          </Link>
          <Link to="/Login" className="home-link">
            Profile
          </Link>
          <Link to="/Signup" className="home-link">
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

