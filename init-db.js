// init-db.js
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbDir = path.join(__dirname, "db");
const dbPath = path.join(dbDir, "database.db");
const schemaPath = path.join(dbDir, "schema.sql");

// Ensure the database directory exists
if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir);
}

// If the database exists, delete it for a clean rebuild
if (fs.existsSync(dbPath)) {
	fs.unlinkSync(dbPath);
	console.log("Existing database removed.");
}

// Create a new SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Error creating database:", err.message);
		process.exit(1);
	}
	console.log("New SQLite database created.");
	db.close();
});

module.exports = db;
