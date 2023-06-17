//user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  place: String,
  age: Number,
  email: String,
  no: Number,
  password: String,
  education:String,
  status:{
    type:String,
    enum:['blocked','unblocked'],
    required: true,
    default:'unblocked',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
