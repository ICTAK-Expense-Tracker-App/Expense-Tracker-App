import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableContainer, TableHead,TableBody, TableRow, Button } from '@mui/material';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);

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
    // Block the user with the given userId
    // Implement the blocking logic on the server-side
    // You can use Axios to send a POST request to the server-side endpoint
    console.log('Block user with ID:', userId);
  };

  const handleDeleteUser = (userId) => {
    // Delete the user with the given userId
    // Implement the delete logic on the server-side
    // You can use Axios to send a DELETE request to the server-side endpoint
    console.log('Delete user with ID:', userId);
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
                  <Button onClick={() => handleBlockUser(user.id)}>Block</Button>
                  <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
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
