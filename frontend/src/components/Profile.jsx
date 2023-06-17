import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Profile.css';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';

const Profile = ({ userId }) => {
  const [user, setUser] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterNewPassword, setReEnterNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Handle option selection in the sidebar
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setCurrentPassword('');
    setNewPassword('');
    setReEnterNewPassword('');
    setPasswordError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPassword('');
    setNewPassword('');
    setReEnterNewPassword('');
    setPasswordError('');
  };

  // Fetch user profile data from the server
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:9002/profile', {
          params: { userId: userId },
        });
        const userData = response.data.user;
        setUser(userData);
        setUpdatedUser(userData);
      } catch (error) {
        console.error('Error occurred while fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleSubmitPassword = async () => {
    try {
      // Check if the current password is correct
      const response = await axios.post('http://localhost:9002/VerifyPassword', {
        userId: user.email,
        password: currentPassword,
      });

      if (response.status === 200) {
        // Check if the new password and re-entered password match
        if (newPassword !== reEnterNewPassword) {
          setPasswordError('Passwords do not match');
          return;
        }

        // Update the user's password in the database
        const updateResponse = await axios.put('http://localhost:9002/UpdatePassword', {
          userId: user.email,
          password: newPassword,
        });

        if (updateResponse.status === 200) {
          setPasswordError('Successfully updated');
        } else {
          setPasswordError('Failed to update password');
        }
      } else {
        setPasswordError('Incorrect current password');
      }
    } catch (error) {
      console.error('Error occurred while updating password:', error);
    }
  };

  // Toggle editing mode
  const handleEdit = () => {
    setEditing(!editing);
    setUpdatedUser(user); // Reset updatedUser to the original user data when entering editing mode
  };

  // Handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Save the updated user profile
  const handleSave = async () => {
    try {
      await axios.put('http://localhost:9002/profile', {
        userId: user.email, // Pass the userId in the request body
        name: updatedUser.name,
        place: updatedUser.place,
        education: updatedUser.education,
        age: updatedUser.age,
        no: updatedUser.no,
        email: updatedUser.email,
      });
      setEditing(false);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error occurred while updating user profile:', error);
    }
  };

  return (
    <div className="profile-page">
      <div className="sb">
        <Sidebar handleOptionSelect={handleOptionSelect} />
      </div>

      <div className="profile-content">
        <h1 className="profile-heading">Profile</h1>

        <div className="profile-details">
          <div className="profile-field">
            <label className="profile-label">Name:</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={updatedUser.name || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{user.name}</span>
            )}
          </div>

          <div className="profile-field">
            <label className="profile-label">Place:</label>
            {editing ? (
              <input
                type="text"
                name="place"
                value={updatedUser.place || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{user.place}</span>
            )}
          </div>

          <div className="profile-field">
            <label className="profile-label">Education:</label>
            {editing ? (
              <input
                type="text"
                name="education"
                value={updatedUser.education || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{user.education}</span>
            )}
          </div>

          <div className="profile-field">
            <label className="profile-label">Age:</label>
            {editing ? (
              <input
                type="text"
                name="age"
                value={updatedUser.age || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{user.age}</span>
            )}
          </div>

          <div className="profile-field">
            <label className="profile-label">Phone Number:</label>
            {editing ? (
              <input
                type="text"
                name="no"
                value={updatedUser.no || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{user.no}</span>
            )}
          </div>

          <div className="profile-field">
            <label className="profile-label">Email:</label>
            {editing ? (
              <input
                type="text"
                name="email"
                value={updatedUser.email || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{user.email}</span>
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

          <button className="profile-button" onClick={handleOpenDialog}>
            Change Password
          </button>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
              <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Re-enter New Password"
                type="password"
                value={reEnterNewPassword}
                onChange={(e) => setReEnterNewPassword(e.target.value)}
                fullWidth
                margin="normal"
                error={!!passwordError}
                helperText={passwordError}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmitPassword} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
