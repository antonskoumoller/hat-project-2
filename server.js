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
			console.error("Error retrieving Customer:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (row.length === 0) {
			return res.status(404).json({ error: "Customer not found" });
		}
		res.status(200).json(row);
	});
});

//Endpoint to create a new customer (Maybe this should be the path to the login form ?)
app.post("/customers", (req, res) => {
	const { name, email, password } = req.body;
	// Validate input
	if (!name || !email || !password) {
		return res.status(400).json({ error: "Name, email, and password are required" });
	}
	// querry 
	const query = "INSERT INTO customers (name, email, password) VALUES (?, ?, ?)";

	db.run(query, [name, email, password], function (err) {
		if (err) {
			console.error("Error creating Customer:", err.message);
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
			console.error("Error retrieving Customer:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (row.length === 0) {
			return res.status(404).json({ error: "Customer not found" });
		}
		res.status(200).json(row);
	});
});

// Update customer with id
app.put("/customers/:id", (req, res) => {
	const customerId = req.params.id;
	const { name, email, password } = req.body;

	// Validate input (Is nescessary beause we want the front-end to handle updating the object and then giving it to the back-end with all fields)
	if (!name || !email || !password) {
		return res.status(400).json({ error: "Name, email, and password are required" });
	}

	const query = "UPDATE customers SET name = ?, email = ?, password = ? WHERE id = ?";

	db.run(query, [name, email, password, customerId], function (err) {
		if (err) {
			console.error("Error updating Customer:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		// this.changes is an sqlite3 property that shows how many rows were affected
		if (this.changes === 0) {
			return res.status(404).json({ error: "Customer not found" });
		}
		res.status(200).json({ id: customerId, name, email, password });
	});

});

//Delete customer with id (Maybe we should have some kind of cascading effect, so basket-items are also deleted?)
app.delete("/customers/:id", (req, res) => {
	const customerId = req.params.id;
	const query = "DELETE FROM customers WHERE id = ?";

	db.run(query, [customerId], function (err) {
		if (err) {
			console.error("Error deleting Customer:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (this.changes === 0) {
			return res.status(404).json({ error: "Customer not found" });
		}
		res.status(204).send();
	});
});

// Endpoint to get customers
app.post("/customers", (req, res) => {
	res.status(200).json("HEY");
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
