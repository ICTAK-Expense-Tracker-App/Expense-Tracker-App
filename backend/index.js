//index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/user');
const Expense = require('./model/expense');
const { ObjectId } = require('mongodb');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect('mongodb+srv://annmarywilson:annmarywilson@cluster0.fwg4655.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });



  app.post('/test-json', async (req, res) => {
    console.log('test')
    
    const firstData = await Expense.find({email: "test@gmail.com"}).exec();
    console.log(firstData);
    res.send(firstData);
  });


  app.post('/SignUp', (req, res) => {
    const { name, place, education, age, email, no, password, reEnterPassword } = req.body;
  
    // Check if the passwords match
    if (password !== reEnterPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    // Check if the email already exists
    User.findOne({ email }, (err, existingUser) => {
      if (err) {
        return res.status(500).json({ message: 'Error occurred during signup', error: err.message });
      }
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered. Please enter a different email' });
      }
  
      // Create a new user instance
      const newUser = new User({
        name,
        place,
        education,
        age,
        email,
        no,
        password,
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
  });
  
  
  

app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User doesn\'t exist' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // User login successful
    res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    res.status(500).json({ message: 'Error occurred during login', error });
  }
});

app.get('/profile', async (req, res) => {
  try {
    const userId = req.query.userId;

    
    // Fetch the user details based on the user ID
    const user = await User.findOne({ email: decodeURIComponent(userId) });



    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user profile details
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching user profile', error: error.message });
  }
});


// ...

app.put('/profile', async (req, res) => {
  try {
    const userId = req.body.userId;

    // Find the user with the provided user ID
    const user = await User.findOne({ email: decodeURIComponent(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user profile
    user.name = req.body.name;
    user.place = req.body.place;
    user.education=req.body.education;
    user.age = req.body.age;
    user.no = req.body.no;
    user.email = req.body.email;

    // Save the updated user profile
    await user.save();

    // Return the updated user profile
    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while updating user profile', error: error.message });
  }
});

// ...

// ...

app.post('/VerifyPassword', async (req, res) => {
  try {
    const userId = req.body.userId;
    const password = req.body.password;

    // Find the user with the provided user ID
    const user = await User.findOne({ email: decodeURIComponent(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided password matches the user's current password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Password verification successful
    res.status(200).json({ message: 'Password verification successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred during password verification', error });
  }
});

app.put('/UpdatePassword', async (req, res) => {
  try {
    const userId = req.body.userId;
    const password = req.body.password;

    // Find the user with the provided user ID
    const user = await User.findOne({ email: decodeURIComponent(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password
    user.password = password;

    // Save the updated user profile
    await user.save();

    // Password update successful
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while updating password', error: error.message });
  }
});


app.post('/transactions', async (req, res) => {
  try {
    const { email, type, amount, date, note } = req.body;

    // Create a new expense instance
    const newExpense = new Expense({
      email,
      type,
      amount,
      date,
      note,
    });

    // Save the expense to the database
    const savedExpense = await newExpense.save();

    res.status(200).json(savedExpense); // Return the saved expense object as the response
  } catch (error) {
    console.error('Error occurred while saving expense:', error);
    res.status(500).json({ message: 'Failed to register expense', error: error.message });
  }
});



app.get('/income', async (req, res) => {
  try {
    const { email } = req.query;

    // Find all income transactions for the given email
    const income = await Transaction.find({ email, type: 'income' });

    // Calculate the total income
    const totalIncome = income.reduce((sum, transaction) => sum + transaction.amount, 0);

    res.status(200).json({ income, totalIncome });
  } catch (error) {
    console.error('Error occurred while fetching income:', error);
    res.status(500).json({ message: 'Failed to fetch income', error: error.message });
  }
});

app.get('/expenses', async (req, res) => {
  try {
    const { email } = req.query;

    // Find all expense transactions for the given email
    const expenses = await Transaction.find({ email, type: 'expense' });

    // Calculate the total expenses
    const totalExpenses = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);

    res.status(200).json({ expenses, totalExpenses });
  } catch (error) {
    console.error('Error occurred while fetching expenses:', error);
    res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
  }
});


app.get('/checkEmail', (req, res) => {
  // Retrieve the email parameter from the query string
  const email = req.query.email;

  // Check if the email already exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ message: 'Error occurred during email validation', error: err.message });
    }
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered. Please enter a different email' });
    }

    // Email is valid and doesn't exist in the database
    res.status(200).json({ message: 'Email is valid' });
  });
});







app.listen(9002, () => {
  console.log('Server listening on port 9002');
});