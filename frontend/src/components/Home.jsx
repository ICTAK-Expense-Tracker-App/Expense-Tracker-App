import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar';
import './Home.css';
import './AddNew';
import './Admin';
import './Profile';

const Home = () =>{
    return (
        <div className="home-container">
            <NavBar/>
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