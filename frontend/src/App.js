import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
<<<<<<< HEAD
=======

>>>>>>> e806de784fc20908203496f804387d341e5a7375

function App() {
  return (
    <div className="App">
      
       <NavBar /> 
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
=======
       
>>>>>>> e806de784fc20908203496f804387d341e5a7375
      </Routes>
    </div>
  );
}

export default App;