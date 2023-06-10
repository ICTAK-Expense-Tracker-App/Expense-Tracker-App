import React from 'react';
import { Link } from 'react-router-dom';
import './AddNew.css';

const AddNewPage = () => {
  return (
    <div className="addnew-container">
      <div className="addnew-content">
        <h1 className="addnew-heading">Add New Income/Expense</h1>
      </div>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default AddNewPage;
