// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const isLoginPage = window.location.pathname === '/Login';

  return (
    <div className="App">
      {!isLoginPage && <NavBar />} {/* Render the navbar only if it's not the login page */}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
