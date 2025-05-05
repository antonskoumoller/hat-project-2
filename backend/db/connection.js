//Sets up the data-base connection and exports it for use in models

const sqlite3 = require("sqlite3").verbose();

//Creates data-base connection, established in specified file, used for read and write
const db = new sqlite3.Database("./db/database.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		console.error("Error connecting to database:", err.message);
		process.exit(1);
	}
	// Enable foreign key constraints(This enable us to cascade-delete basket-items when deleting a customer)
	db.run("PRAGMA foreign_keys = ON");

	console.log("Connected to the SQLite database.");
});

module.exports = db;