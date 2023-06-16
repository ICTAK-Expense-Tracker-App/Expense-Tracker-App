import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CSSTransition } from 'react-transition-group';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState('expense');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const baseURL = 'http://localhost:3000'; 

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${baseURL}/transactions`);
      const transactionsData = response.data;
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

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
      date: transactionDate,
    };

    try {
      const response = await axios.post(`${baseURL}/transactions`, newTransaction);
      const addedTransaction = response.data;
      setTransactions([...transactions, addedTransaction]);
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await axios.delete(`${baseURL}/transactions/${transactionId}`);
      setTransactions(transactions.filter((transaction) => transaction._id !== transactionId));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const renderTransactionsByMonth = () => {
    const groupedTransactions = groupTransactionsByMonth(transactions);

    return Object.keys(groupedTransactions).map((month) => (
      <div key={month}>
        <h3>{month}</h3>
        <ul>
          {groupedTransactions[month].map((transaction) => (
            <li key={transaction._id} className={transaction.type === 'expense' ? 'expense' : 'income'}>
              <span>{transaction.amount}</span>
              <span>{transaction.note}</span>
              <span>{transaction.date}</span>
              <Button onClick={() => deleteTransaction(transaction._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const groupTransactionsByMonth = (transactions) => {
    const groupedTransactions = {};

    transactions.forEach((transaction) => {
      const month = transaction.date.slice(0, 7); // Extract the month (YYYY-MM)
      if (!groupedTransactions[month]) {
        groupedTransactions[month] = [];
      }
      groupedTransactions[month].push(transaction);
    });

    return groupedTransactions;
  };

  return (
    <div>
      <h2>Transactions</h2>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
        Add Transaction
      </Button>
      {renderTransactionsByMonth()}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Transaction</DialogTitle>
        <CSSTransition in={openDialog} timeout={300} classNames="fade" unmountOnExit>
          <DialogContent>
            <Select value={transactionType} onChange={handleTransactionTypeChange}>
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </Select>
            <TextField label="Amount" value={transactionAmount} onChange={handleTransactionAmountChange} />
            <TextField label="Note" value={transactionNote} onChange={handleTransactionNoteChange} />
            <TextField type="date" value={transactionDate} onChange={handleTransactionDateChange} />
          </DialogContent>
        </CSSTransition>
        <DialogActions>
          <Button onClick={handleAddTransaction} color="primary">
            Add
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Transactions;



