// init-db.js
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbDir = path.join(__dirname, "db");
const dbPath = path.join(dbDir, "database.db");
const schemaPath = path.join(dbDir, "schema.sql");
const seedPath = path.join(dbDir, "seed.sql");

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
});

// Read the schema file and execute its SQL commands
fs.readFile(schemaPath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading schema file:", err.message);
		process.exit(1);
	}
	db.exec(data, (err) => {
		if (err) {
			console.error("Error executing schema:", err.message);
			process.exit(1);
		}
		console.log("Database schema applied successfully.");
	});
});

// Read and execute the seed file after the schema is applied
fs.readFile(seedPath, "utf8", (err, seedData) => {
	if (err) {
		console.error("Error reading seed file:", err.message);
		process.exit(1);
	}
	db.exec(seedData, (err) => {
		if (err) {
			console.error("Error executing seed data:", err.message);
			process.exit(1);
		}
		console.log("Database seeded successfully.");
		// Close the database connection after seeding
		db.close();
	});
});
module.exports = db;
