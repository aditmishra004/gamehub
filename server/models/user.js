const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, // No two users can have the same username
    trim: true    // Removes any extra spaces
  },
  password: { 
    type: String, 
    required: true 
  }
});

module.exports = mongoose.model('User', userSchema);