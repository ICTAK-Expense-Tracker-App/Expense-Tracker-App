const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  email:{
    type:String,
    requied:true,
  },
  type: {
    type: String,
    enum:['income','expense'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;

