import React, { useState } from 'react';
import './Dashboard.css';
import AddNew from './AddNew';
import Profile from './Profile';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('incomeExpense');
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleAddExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    calculateTotalExpenses();
  };

  const calculateTotalExpenses = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(total);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-buttons">
        <button onClick={() => handleOptionSelect('incomeExpense')}>Income/Expense</button>
        <button onClick={() => handleOptionSelect('editProfile')}>Edit Profile</button>
      </div>
      <div className="dashboard-content">
        {selectedOption === 'incomeExpense' && <AddNew onAddExpense={handleAddExpense} />}
        {selectedOption === 'editProfile' && <Profile totalExpenses={totalExpenses} />}
      </div>
    </div>
  );
};

export default Dashboard;
