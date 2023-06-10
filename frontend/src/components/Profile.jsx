import React from 'react';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1 className="profile-heading">Profile</h1>
      </div>
    
      <div className="profile-details">
        <p>User Details</p>
        <p>Total Expenses</p>
      </div>

      <div className="button-container">
        <button className="profile-button">Edit Profile</button>
        <button className="profile-button">Change Password</button>
      </div>
    </div>
  );
};

export default Profile;
