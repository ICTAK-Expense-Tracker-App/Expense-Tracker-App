import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './AddNew.css';

const AddNew = () => {
    return (
        <div className="addnew-container">
            <NavBar/>
            <div className="addnew-content">
                <h1 className="addnew-heading">Add New Income/Expense</h1>
            </div>
            <Link to="/">Go Back</Link>
        </div>
    );
}

export default AddNew;