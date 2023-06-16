// dashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
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
import './Dashboard.css';
import './Transactions.css';

const Dashboard = ({ userId }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionData, setTransactionData] = useState([]);
  const [user, setUser] = useState({});
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:9002/profile', {
        params: { userId: userId },
      });
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.error('Error occurred while fetching user profile:', error);
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async () => {
    const newTransaction = {
      type: transactionType,
      amount: transactionAmount,
      note: transactionNote,
      date: transactionDate,
      email: user.email,
    };
  
    try {
      const response = await axios.post('http://localhost:3000/transactions', newTransaction);
      const addedTransaction = response.data;
      setTransactionData([...transactionData, addedTransaction]);
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }

    handleCloseDialog();
  };

  const fetchIncomeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/income?email=${user.email}`);
      const { income, totalIncome } = response.data;
      setIncome(income);
      setTotalIncome(totalIncome);
    } catch (error) {
      console.error('Error fetching income details:', error);
    }
  };
  
  const fetchExpensesDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/expenses?email=${user.email}`);
      const { expenses, totalExpenses } = response.data;
      setExpenses(expenses);
      setTotalExpenses(totalExpenses);
    } catch (error) {
      console.error('Error fetching expenses details:', error);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchExpensesDetails();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar handleOptionSelect={handleOptionSelect} />

      <div className="main">
        <h1>Welcome, {user.name}</h1>

        <div className="transaction-container">
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Add Transaction
          </Button>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogContent>
              <Select
                value={transactionType}
                onChange={handleTransactionTypeChange}
                fullWidth
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>

              <TextField
                type="number"
                label="Amount"
                value={transactionAmount}
                onChange={handleTransactionAmountChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                type="date"
                label="Date"
                value={transactionDate}
                onChange={handleTransactionDateChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Note"
                value={transactionNote}
                onChange={handleTransactionNoteChange}
                fullWidth
                variant="outlined"
                margin="normal"
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

          <div className="transaction-table">
            <h2>Transactions</h2>
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
                {transactionData.map((transaction) => (
                  <tr key={transaction._id}>
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
      </div>
    </div>
  );
};

export default Dashboard;
