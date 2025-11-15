const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const JWT_SECRET = 'your-super-secret-key-that-is-long-and-random'; // IMPORTANT: Change this!


// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  
  // Hash the password for security
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
  } catch (err) {
    // This will catch errors like a duplicate username
    res.status(400).json({ message: 'Username already exists or invalid data' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  // Check if user exists and if the password is correct
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' }); // 401 means Unauthorized
  }

  // If credentials are correct, create a secure token
  const token = jwt.sign(
    { id: user._id, username: user.username }, 
    JWT_SECRET, 
    { expiresIn: '1h' } // Token will be valid for 1 hour
  );
  
  res.json({ token });
});

module.exports = router;