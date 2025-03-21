const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Define paths to the database file and schema file
const dbPath = path.join(__dirname, 'db', 'database.db');
const schemaPath = path.join(__dirname, 'db', 'schema.sql');

// Open (or create) the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
});

// Read the SQL schema file and execute its contents
fs.readFile(schemaPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading schema file:', err.message);
    return;
  }
  db.exec(data, (err) => {
    if (err) {
      console.error('Error executing SQL schema:', err.message);
    } else {
      console.log('Database schema applied successfully.');
    }
  });
});

module.exports = db;
