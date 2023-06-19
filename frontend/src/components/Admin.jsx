import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableContainer, TableHead,TableBody, TableRow, Button } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar.jsx';

const Admin = () => {
  const [users, setUsers] = useState([]);
  //const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true); // Replace `true` with the initial login status of the admin
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  useEffect(() => {
    // Fetch the list of registered users from the server
    axios
      .get('http://localhost:9002/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log('Error occurred while fetching users', error);
      });
  }, []);


  const handleBlockUser = (userId) => {
    axios
      .post(`http://localhost:9002/blockUser/${userId}`)
      .then((res) => {
        console.log('User blocked successfully');
        // Perform any additional actions after blocking the user
      })
      .catch((error) => {
        console.log('Error occurred while blocking user:', error);
        // Handle any error that occurs while blocking the user
      });
  };
  
  const handleDeleteUser = (userId) => {
    axios.delete("http://localhost:9002/delete/"+userId)
        .then(((response)=>{
            alert("deleted")
            window.location.reload(false)
        }))
        .catch(err=>console.log(err))
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    axios
      .post('/admin/logout')
      .then((res) => {
        console.log(res.data.message);
        // Perform any additional actions after logout if needed
      })
      .catch((error) => {
        console.log('Error occurred while logging out:', error);
        // Handle any error that occurs while logging out
      });
  };

  return (
    <div>
      <h6 style={{ fontSize: '30px' }}>USER DETAILS</h6>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'greenyellow', fontSize: '40px' }}>NAME</TableCell>
              <TableCell style={{ color: 'blue', fontSize: '40px' }}>EMAIL ID</TableCell>
              <TableCell style={{ color: 'RED', fontSize: '40px' }}>ACCESS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleBlockUser(user._id)}>Block</Button>
                  <Button onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Admin;
