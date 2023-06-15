import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:9002/profile', {
          params: { userId: userId }
        });
        console.log(response.data.user); 
        const userData = response.data.user;
        setUser(userData);
        setUpdatedUser(userData);
      } catch (error) {
        console.error('Error occurred while fetching user profile:', error);
      }
    };
  
    fetchUserProfile();
  }, [userId]);

  const handleEdit = () => {
    setEditing(!editing);
    setUpdatedUser(user); // Reset updatedUser to the original user data when entering editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:9002/profile', updatedUser);
      setEditing(false);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error occurred while updating user profile:', error);
    }
  };

  return (
    <div className="profile-container">
      
      <div className="profile-content">
        <h1 className="profile-heading">Profile</h1>
      </div>

      <div className="profile-details">
        <div className="profile-field">
          <label>Name:</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={updatedUser.name || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Place:</label>
          {editing ? (
            <input
              type="text"
              name="place"
              value={updatedUser.place || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.place}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Age:</label>
          {editing ? (
            <input
              type="text"
              name="age"
              value={updatedUser.age || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.age}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Phone Number:</label>
          {editing ? (
            <input
              type="text"
              name="no"
              value={updatedUser.no || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.no}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Email:</label>
          {editing ? (
            <input
              type="text"
              name="email"
              value={updatedUser.email || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.email}</span>
            )}
          </div>
        </div>
  
        <div className="button-container">
          {editing ? (
            <button className="profile-button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="profile-button" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
          <button className="profile-button">Change Password</button>
        </div>
      </div>
    );
  };
  
  export default Profile;
  
