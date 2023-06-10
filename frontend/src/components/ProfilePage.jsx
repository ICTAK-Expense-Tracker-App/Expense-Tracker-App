import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

const ProfilePage = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    // Fetch the total income and expense of the month from the API or database
    axios.get('http://localhost:9002/income').then((response) => {
      setIncome(response.data.totalIncome);
    });

    axios.get('http://localhost:9002/expense').then((response) => {
      setExpense(response.data.totalExpense);
    });
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile Details</h1>
      {/* Display user profile details here */}
      {/* Add form fields to update profile details */}
      {/* Example: */}
      <label>Name:</label>
      <input type="text" />

      <label>Email:</label>
      <input type="email" />

      {/* Display total income and expense */}
      <p>Total Income: ${income}</p>
      <p>Total Expense: ${expense}</p>

      <Link to="/">Go Back</Link>
    </div>
  );
};

export default ProfilePage;
