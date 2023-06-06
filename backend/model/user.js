const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  place: String,
  age: String,
  email: String,
  no: Number,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
