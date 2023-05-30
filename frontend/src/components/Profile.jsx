import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
 
const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-content">
                <h1 className="profile-heading">User Profile</h1>
            </div>
            <Link to="/">Go Back</Link>

        </div>
    );
}

export default Profile;