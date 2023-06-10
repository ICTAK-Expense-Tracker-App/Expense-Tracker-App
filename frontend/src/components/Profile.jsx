import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">

    <div className="profile-content">
        <h1 className="profile-heading">Profile</h1>
      </div>
    
      <h1>Profile</h1>
      <p>User Details</p>
      <p>Total Expenses</p>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Profile;