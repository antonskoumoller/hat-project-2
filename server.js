const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();

// Open a new database connection for the server
const db = new sqlite3.Database("./db/database.db", (err) => {
	if (err) {
		console.error("Error connecting to database:", err.message);
		process.exit(1);
	}
	console.log("Connected to the SQLite database.");
});

app.use(express.json());

// Endpoint to get all customers
app.get("/customers", (req, res) => {
	const query = "SELECT * FROM customers";
	db.all(query, (err, row) => {
		if (err) {
			console.error("Error retrieving user:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (!row) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json(row);
	});
});

//Endpoint to create a new customer
app.post("/customers", (req, res) => {
	const { name, email, password } = req.body;
	// Validate input
	if (!name || !email || !password) {
		return res.status(400).json({ error: "Name, email, and password are required" });
	}
	// querry 
	const query = "INSERT INTO customers (name, email, password) VALUES (?, ?, ?)";

	db.post(query, [name, email, password], function (err) {
		if (err) {
			console.error("Error creating user:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		res.status(201).json({ id: this.lastID, name, email });
	});
})

// Endpoint to get customer with id
app.get("/customers/:id", (req, res) => {
	const customerId = req.params.id;
	const query = "SELECT * FROM customers WHERE id = ?";
	db.get(query, [customerId], (err, row) => {
		if (err) {
			console.error("Error retrieving user:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (!row) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json(row);
	});
});

// Update customer with id

//Delete customer with id



// GET /customers/:id/basket
app.get("/customers/:id/basket", (req, res) => {
	const customerId = req.params.id;
	const query = `
      SELECT *
      FROM basketEntries
      JOIN products p ON p.id = basketEntries.product_id
      WHERE customer_id = ?
    `;
	db.all(query, [customerId], (err, rows) => {
		if (err) {
			console.error("Error retrieving basket:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		res.status(200).json(rows);
	});
});

// Endpoint to get customer with id
app.get("/customers/:id", (req, res) => {
	const customerId = req.params.id;
	const query = "SELECT * FROM customers WHERE id = ?";
	db.get(query, [customerId], (err, row) => {
		if (err) {
			console.error("Error retrieving user:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (!row) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json(row);
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
