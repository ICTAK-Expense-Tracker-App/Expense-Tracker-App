import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AddNew from './components/AddNew';
import Profile from './components/Profile';

function App() {
  const [user, setLoginUser] = useState({});

  return (
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/AddNew" element={<AddNew />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
  );
}

export default App;

