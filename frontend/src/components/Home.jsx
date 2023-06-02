import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import './AddNew.jsx';
import './Admin.jsx';
import './Profile.jsx';
import heyy from '../assets/heyy.jpg';

const Home = () =>{
    return (
        <div className="homepage">
                <div className="home-content">
                    <h1 className="home-heading">WELCOME TO HOME PAGE</h1>
                    <p>Here you can View and Manage your Income and Expenses.</p>

                    <Link to="/AddNew" className="home-link">Add New</Link>
                    <Link to="/Profile" className="home-link">Profile</Link>
                    <Link to="/Admin" className="home-link">Admin</Link>
                </div>
        
        </div>
    );
}

export default Home;