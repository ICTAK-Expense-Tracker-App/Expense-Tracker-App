import React, { useState, useEffect } from 'react';
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

const Transactions = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionData, setTransactionData] = useState([]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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

  const handleAddTransaction = async () => {
    const newTransaction = {
      type: transactionType,
      amount: transactionAmount,
      note: transactionNote,
      date: transactionDate
    };

    try {
      const response = await axios.post('http://localhost:9002/transactions', newTransaction);

      if (response.status === 200) {
        console.log('Transaction added successfully');
        const transaction = response.data;
        setTransactionData([...transactionData, transaction]);
      } else {
        console.log('Failed to add transaction');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    handleCloseDialog();
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

  return (
    <div>
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
  );
}

export default Transactions;



