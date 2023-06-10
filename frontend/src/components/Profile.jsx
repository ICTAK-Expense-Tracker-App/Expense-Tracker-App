import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:9002/profile')
      .then((res) => {
        setProfileData(res.data.user);
      })
      .catch((error) => {
        console.log('Error occurred while fetching user profile', error);
      });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-details">
        {profileData && (
          <div>
            <h2>Profile Details</h2>
            <p>
              <strong>Name:</strong> {profileData.name}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            {/* Add more profile details as needed */}
          </div>
        )}
      </div>
      <div className="main-content">
        {/* Add the main content of the profile page */}
      </div>
    </div>
  );
};

export default Profile;
