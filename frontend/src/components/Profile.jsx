import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './Profile.css';
 
const Profile = () => {
    return (
        <div className="profile-container">
            <NavBar />
            <div className="profile-content">
                <h1 className="profile-heading">User Profile</h1>
            </div>
            <Link to="/">Go Back</Link>

        </div>
    );
}

export default Profile;