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


// ...

app.post('/blockUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's status field to indicate that they are blocked
    user.status = 'blocked';

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error('Error occurred while blocking user:', error);
    res.status(500).json({ message: 'Failed to block user', error: error.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error occurred while deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

// ...



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
  
  
  

// ...

app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User doesn\'t exist' });
    }

    // Check if the user is blocked
    if (user.status === 'blocked') {
      return res.status(401).json({ message: 'User blocked by admin' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // User login successful
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred during login', error });
  }
});

// ...


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


app.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}).exec();

    // Return the list of users as the response
    res.status(200).json(users);
  } catch (error) {
    console.error('Error occurred while fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
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

// ...

app.post('/transactions', async (req, res) => {

  try {
    const { email,type, amount, date, note } = req.body;

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


app.get('/transactions', async (req, res) => {
  try {
    const email = req.query.email;

    // Fetch transactions based on the provided email
    const transactions = await Expense.find({ email }).exec();

    // Return the transactions as the response
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error occurred while fetching transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }
});


app.get('/totals', async (req, res) => {
  try {
    // Get the email from the request query parameters
    const email = req.query.email;

    // Find the user with the provided email
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the user's transactions
    const transactions = await Expense.find({ email }).exec();

    // Calculate the total income and expense
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpense += transaction.amount;
      }
    });

    res.status(200).json({ totalIncome, totalExpense });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while calculating totals', error: error.message });
  }
});



app.get('/checkEmail', async (req, res) => {
  try {
    const email = req.query.email;
    console.log(email);

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered. Please enter a different email' });
    }

    res.status(200).json({ message: 'Email is valid' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred during email validation', error: err.message });
  }
});


app.delete('/transactions/:transactionId', async (req, res) => {
  try {
    const transactionId = req.params.transactionId;

    // Find the transaction by its ID and delete it
    await Expense.findByIdAndDelete(transactionId);

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error occurred while deleting transaction:', error);
    res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
  }
});

app.put('/transactions/:transactionId', async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const { email, type, amount, date, note } = req.body;

    // Find the transaction by its ID
    const transaction = await Expense.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update the transaction properties
    transaction.email = email;
    transaction.type = type;
    transaction.amount = amount;
    transaction.date = date;
    transaction.note = note;

    // Save the updated transaction to the database
    await transaction.save();

    res.status(200).json({ message: 'Transaction updated successfully', transaction });
  } catch (error) {
    console.error('Error occurred while updating transaction:', error);
    res.status(500).json({ message: 'Failed to update transaction', error: error.message });
  }
});



app.listen(9002, () => {
  console.log('Server listening on port 9002');
});