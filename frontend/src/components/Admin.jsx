import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './Admin.css';

const Admin = () => {
    return (
        <div className="admin-container">
            <NavBar />
            <div className="admin-content">
                <h1 className="admin-heading">Admin Dashboard</h1>
            </div>
            <Link to="/">Go Back</Link>
        </div>
    );
}

export default Admin;