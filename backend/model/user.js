//user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  name: String,
  place: String,
  age: Number,
  email: String,
  no: Number,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
