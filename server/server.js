// server/server.js

// --- 1. SETUP & IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes and models
const authRoutes = require('./routes/auth');
const Score = require('./models/score');
const auth = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;


// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../games')));

// --- 3. DATABASE CONNECTION ---
// Make sure you have replaced this with your actual connection string!


const dbURI = 'NOT Gonna Tell You';

mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('DB connection error:', err));


// --- 4. API ROUTES ---

// Authentication routes (/api/auth/register, /api/auth/login)
app.use('/api/auth', authRoutes);

// Score submission route (Protected)
app.post('/api/scores', auth, async (req, res) => {
  const { gameName, score } = req.body;
  const playerId = req.user.id; // Get user ID from the verified token

  const newScore = new Score({
    gameName,
    score,
    player: playerId
  });

  try {
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Leaderboard route
app.get('/api/leaderboard', async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(20)
      .populate('player', 'username'); // Fetches the username from the User model

    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// --- 5. START THE SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
