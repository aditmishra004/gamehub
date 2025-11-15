// games/auth.js

const API_URL = 'http://localhost:3000';

// This function will be called by your new login UI
async function registerUser(username, password) {
  // Use the NEW message ID from the new UI
  const messageEl = document.getElementById('gh-auth-msg'); 

  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    messageEl.style.color = '#bff7d7'; // Set success color
    messageEl.textContent = 'Registration successful! Please log in.';
    // Tell the new UI to switch to the login tab
    document.getElementById('gh-tab-login').click(); 
  } else {
    const error = await response.json();
    messageEl.style.color = '#ffd7d7'; // Set error color
    messageEl.textContent = `Registration failed: ${error.message}`;
  }
}

// This function will be called by your new login UI
async function loginUser(username, password) {
  // Use the NEW message ID from the new UI
  const messageEl = document.getElementById('gh-auth-msg');

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('token', data.token);
    messageEl.style.color = '#bff7d7'; // Set success color
    messageEl.textContent = 'Login successful! Redirecting...';
    
    // The new UI already has confetti, so we just redirect
    setTimeout(() => {
        // Use your site's built-in navigation to go to the games page
        const nav = document.querySelector('.nav-link[data-page="games"]');
        if (nav) nav.click();
    }, 700); // Wait 0.7s for the user to read the message

  } else {
    messageEl.style.color = '#ffd7d7'; // Set error color
    messageEl.textContent = `Login failed: ${data.message}`;
  }
}

// We no longer need the showRegisterForm() or showLoginForm() functions,
// as your new UI script already handles that.