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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Perform the logout logic
    setIsLoggedIn(false);
    setLoginUser({});
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={Object.keys(user).length !== 0} handleLogout={() => setLoginUser({})} />
      <Routes>
        <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/AddNew" element={<AddNew />} />
        <Route path="/profile" element={<Profile userId={user._id} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
