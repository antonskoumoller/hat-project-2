const express = require('express');
const app = express();

// Initialize the database
const db = require('./init-db');

app.use(express.json());

// Endpoint to get customer with id 1
app.get('/customers/1', (req, res) => {
  const query = 'SELECT * FROM customers WHERE id = ?';
  db.get(query, [1], (err, row) => {
    if (err) {
      console.error('Error retrieving user:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(row);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
