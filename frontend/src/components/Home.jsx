// Home.jsx file
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => {
  return (
    <div className="homepage">
      <div className="content">
        <h1 className="home-heading">EXPENSIO</h1>
        <p>Money Management made simple</p>

        <div className="buttons">
            <button className="home-link" onClick={() => { window.location.href = "/Login"; }}>
              Login
            </button>
            <button className="home-link" onClick={() => { window.location.href = "/SignUp"; }}>
              Signup
            </button>
        </div>
        </div>
      </div>
  );
};

export default Home;

