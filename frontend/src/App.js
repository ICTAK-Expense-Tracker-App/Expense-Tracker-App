import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path='/' element={<Home/>}/>
          {/* <Route path="/"
            element={
              user && user._id ? <Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
            }/> */}
          
        </Routes>
    </div>
  );
}

export default App;
