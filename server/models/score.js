// server/models/score.js
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  gameName: { type: String, required: true },
  score: { type: Number, required: true },
  // This is the important change: It links to a document in the 'User' collection
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);