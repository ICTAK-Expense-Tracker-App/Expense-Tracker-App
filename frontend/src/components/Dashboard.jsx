import React, { useState } from 'react';
import './Dashboard.css';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import './Transactions.css';

const Dashboard = ({userId}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionData, setTransactionData] = useState([]);
  const [user, setUser] = useState({});
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:9002/profile', {
          params: { userId: userId },
        });
        const userData = response.data.user;
        // setUser(userData);
        // setUpdatedUser(userData);
        const userEmail=response.data.user.email
      } catch (error) {
        console.error('Error occurred while fetching user profile:', error);
      }
    };
   
    fetchUserProfile();
  }, [userId]);
 
  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleTransactionAmountChange = (event) => {
    setTransactionAmount(event.target.value);
  };

  const handleTransactionNoteChange = (event) => {
    setTransactionNote(event.target.value);
  };

  const handleTransactionDateChange = (event) => {
    setTransactionDate(event.target.value);
  };
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:9002/transactions');

        if (response.status === 200) {
          const transactions = response.data;
          setTransactionData(transactions);
        } else {
          console.log('Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTransactions();
  }, []);
  

// Fetch income details
fetch(`/income?email=${user.email}`)
  .then(response => response.json())
  .then(data => {
    // Handle the income data
    const { income, totalIncome } = data;
    console.log('Income:', income);
    console.log('Total Income:', totalIncome);
  })
  .catch(error => {
    console.error('Error fetching income:', error);
  });

// Fetch expense details
fetch(`/expenses?email=${user.email}`)
  .then(response => response.json())
  .then(data => {
    // Handle the expense data
    const { expenses, totalExpenses } = data;
    console.log('Expenses:', expenses);
    console.log('Total Expenses:', totalExpenses);
  })
  .catch(error => {
    console.error('Error fetching expenses:', error);
  });

// ...

const handleAddTransaction = async () => {
  const newTransaction = {
    email:user.email, // Assuming you have the email stored in the "user.email" variable
    type: transactionType,
    amount: transactionAmount,
    note: transactionNote,
    date: transactionDate,
  };

  try {
    const response = await axios.post('http://localhost:9002/transactions', newTransaction);

    if (response.status === 200) {
      console.log('Transaction added successfully');
      const transaction = response.data;
      setTransactionData([...transactionData, transaction]);
      alert('Transaction added successfully'); // Show alert
    } else {
      console.log('Failed to add transaction');
    }
  } catch (error) {
    console.error('Error:', error);
  }

  handleCloseDialog();
};

// ...


  
  return (
    <div className="dashboard-container">
      <div className='sb'>
      <Sidebar handleOptionSelect={handleOptionSelect} />
      </div>
      <div className="dashboard-content">
          <h1>Income and Expenses</h1>
          <Button
            variant="contained"
            color="primary"
            className="add-button"
            onClick={handleOpenDialog}
          >
            +
          </Button>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogContent>
              <Select value={transactionType} onChange={handleTransactionTypeChange}>
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </Select>
              <TextField
                label="Amount"
                type="number"
                value={transactionAmount}
                onChange={handleTransactionAmountChange}
              />
              <TextField
                label="Note"
                value={transactionNote}
                onChange={handleTransactionNoteChange}
              />
              <TextField
                label="Date"
                type="date"
                value={transactionDate}
                onChange={handleTransactionDateChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddTransaction} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>

          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Note</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.note}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default Dashboard;
