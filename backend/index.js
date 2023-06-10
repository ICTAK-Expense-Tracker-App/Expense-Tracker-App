//index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/user');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect('mongodb+srv://annmarywilson:annmarywilson@cluster0.fwg4655.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.post('/SignUp', (req, res) => {
  const { name, place, age, email, no, password, reEnterPassword } = req.body;

  // Check if the passwords match
  if (password !== reEnterPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Create a new user instance
  const newUser = new User({
    name: req.body.name,
    place: req.body.place,
    age: req.body.age,
    email: req.body.email,
    no: req.body.no,
    password: req.body.password,
    reEnterPassword: req.body.reEnterPassword
  });

  // Save the user to the database
  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to register user', error });
    });
});

app.post('/Login',async (req, res) => {
  const { email, password } = req.body;

  // Find the user with the provided email
  const check= await User.findOne({ email:email })
    .then((check) => {
      if (!check) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the password is correct
      if (check.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // User login successful
      res.status(200).json({ message: 'Login successful' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error occurred during login', error });
    });
});

app.listen(9002, () => {
  console.log('Server listening on port 9002');
});
