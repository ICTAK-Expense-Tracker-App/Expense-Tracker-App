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
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:9002/test-json', {
  params: { userId: userId },
});
        const userData = response.data.user;
        // setUser(userData);
        // setUpdatedUser(userData);
        const userEmail=userData.email
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
    const fetchIncomeAndExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:9002/totals', {
          params: { email: userId },
        });
        console.log(response.data.totalIncome);
        const { totalIncome } = response.data;
        setTotalIncome(totalIncome);
        
        const { totalExpense } = response.data;
        setTotalExpenses(totalExpense);
      } catch (error) {
        console.error('Error fetching income and expenses:', error);
      }
    };
  
    if (userId) {
      fetchIncomeAndExpenses();
    }
  }, [userId]);
  
  
  
  
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:9002/transactions', {
          params: { email: userId },
        });
        const transactions = response.data;
        setTransactionData(transactions);
      } catch (error) {
        console.error('Error occurred while fetching transactions:', error);
      }
    };
  
    fetchTransactions();
  }, [userId]);
  
// Fetch income details
fetch(`/income?email=${userId}`)
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
fetch(`/expenses?email=${userId}`)
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
    email: userId, // Assuming you have the email stored in the "user.email" variable
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
      <div className="summary-container">
        <div className="summary-box">
          <h3>Total Income</h3>
          <p>{totalIncome}</p>
        </div>
        <div className="summary-box">
          <h3>Total Expenses</h3>
          <p>{totalExpenses}</p>
        </div>
      </div>
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
