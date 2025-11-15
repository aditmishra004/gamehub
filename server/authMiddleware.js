// server/authMiddleware.js
const jwt = require('jsonwebtoken');
// Make sure this is the EXACT same secret key from your routes/auth.js file
const JWT_SECRET = 'your-super-secret-key-that-is-long-and-random'; 

function auth(req, res, next) {
  // The token is usually sent in the request headers
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    // Verify the token is valid
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add the user's info (from the token) to the request object
    req.user = decoded;
    next(); // Proceed to the next function (the actual route logic)
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = auth;