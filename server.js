const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();

// Open a new database connection for the server
const db = new sqlite3.Database("./db/database.db", (err) => {
	if (err) {
		console.error("Error connecting to database:", err.message);
		process.exit(1);
	}
	// Enable foreign key constraints(This enable us to cascade-delete basket-items when deleting a customer)
	db.run("PRAGMA foreign_keys = ON");

	console.log("Connected to the SQLite database.");
});

app.use(express.json());

// Endpoint to get all customers
app.get("/customers", (req, res) => {
	const query = "SELECT * FROM customers";
	db.all(query, (err, rows) => {
		if (err) {
			console.error("Error retrieving Customer:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (rows.length === 0) {
			return res.status(404).json({ error: "No customers in database" });
		}
		res.status(200).json(rows);
	});
});

//Endpoint to create a new customer (Maybe this should be the path to the login form ?)
app.post("/customers", (req, res) => {
	const { name, email, password } = req.body;
	// Validate input
	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ error: "Name, email, and password are required" });
	}
	// querry
	const query =
		"INSERT INTO customers (name, email, password) VALUES (?, ?, ?)";

	db.run(query, [name, email, password], function (err) {
		if (err) {
			if (err.code === "SQLITE_CONSTRAINT") {
				return res
					.status(400)
					.json({ error: err.message, email: email });
			}
			console.error("Error creating Customer:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		res.status(201).send(`Customer ${name} created`);
	});
});

// Endpoint to get customer with id
app.get("/customers/:id", (req, res) => {
	const customerId = req.params.id;

	const query = "SELECT * FROM customers WHERE id = ?";
	db.get(query, [customerId], (err, row) => {
		if (err) {
			console.error("Error retrieving Customer:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (row === undefined) {
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
		return res
			.status(400)
			.json({ error: "Name, email, and password are required" });
	}

	const query =
		"UPDATE customers SET name = ?, email = ?, password = ? WHERE id = ?";

	db.run(query, [name, email, password, customerId], function (err) {
		if (err) {
			console.error("Error updating Customer:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		// this.changes is an sqlite3 property that shows how many rows were affected
		if (this.changes === 0) {
			return res.status(404).json({ error: "Customer not found" });
		}
		res.status(200).json({
			message: `Customer with id:${customerId} updated successfully`
		});
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
		res.status(200).json({ message: "Customer deleted" });
	});
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

// Endpoint to get all products
app.get("/products", (req, res) => {
	const query = "SELECT * FROM products";
	db.all(query, (err, row) => {
		if (err) {
			console.error("Error retrieving products:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (!row) {
			return res.status(404).json({ error: "No products were found" });
		}
		res.status(200).json(row);
	});
});

// Endpoint to get all products with category name
app.get("/products/categories/:categoryName", (req, res) => {
	const categoryName = req.params.categoryName;
	const query = "SELECT * FROM products WHERE category = ?";
	db.all(query, [categoryName], (err, rows) => {
		if (err) {
			console.error("Error retrieving category:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (rows.length === 0) {
			return res.status(404).json({ error: "No products found" });
		}
		res.status(200).json(rows);
	});
});

// Get all product categories
app.get("/products/categories", (req, res) => {
	const query = "SELECT DISTINCT category FROM products";
	db.all(query, (err, rows) => {
		if (err) {
			console.error("Error retrieving categories:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		res.status(200).json(rows);
	});
});

//Gets product with id "id"
app.get("/products/:id", (req, res) => {
	const product_id = req.params.id;
	const query = "SELECT * FROM products WHERE id = ?";
	//Check for case where data-base isn't load yet (unlikely)
	if (!db) {
		return res.status(500).json({ error: "Database not yet initialized" });
	}
	db.get(query, [product_id], (err, row) => {
		if (err) {
			//prints the string concatenated with the err.message (separated by space)
			console.error("Error retrieving product:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		//db.get returns undefined if no results
		if (row === undefined) {
			return res.status(404).json({ error: "No products found" });
		}
		res.status(200).json(row);
	});
});

app.post("/customers/:customer_id/basket/:product_id", (req, res) => {
	const customer_id = req.params.customer_id;
	const product_id = req.params.product_id;
	const query = `INSERT INTO basketEntries (customer_id, product_id, quantity)
						VALUES (?, ?, 1)
						ON CONFLICT(customer_id, product_id)
						DO UPDATE
							SET quantity = quantity + EXCLUDED.quantity;`;
	if (!customer_id || !product_id) {
		return res
			.status(400)
			.json({ error: "customer_id and product_id are required" });
	}

	db.run(query, [customer_id, product_id], function (err) {
		if (err) {
			console.error("Error creating updating basketEntry:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		res.status(201).send(
			`Product with ID: ${product_id} added to customer with ID: ${customer_id}`
		);
	});
});

// GET /customers/:id/basket
app.get("/customers/:customer_id/basket/:product_id", (req, res) => {
	const customer_id = req.params.customer_id;
	const product_id = req.params.product_id;
	const query = `
      SELECT quantity
      FROM basketEntries
      JOIN products p ON p.id = basketEntries.product_id
      WHERE customer_id = ? AND product_id = ?
    `;
	db.get(query, [customer_id, product_id], (err, rows) => {
		if (err) {
			console.error("Error retrieving quantity:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}

		if (rows === undefined) {
			return res
				.status(404)
				.json({ error: "Product not found in this customers basket" });
		}

		res.status(200).json(rows);
	});
});

// DELETE /customers/:id/basket
app.delete("/customers/:id/basket", (req, res) => {
	const customerId = req.params.id;
	const query = `
    DELETE FROM basketEntries
    WHERE customer_id = ?
  `;
	db.run(query, [customerId], function (err) {
		if (err) {
			console.error("Error emptying basket:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		res.status(200).json({
			message: `Deleted ${this.changes} item(s) from basket.`
		});
	});
});

app.delete("/customers/:customer_id/basket/:product_id", (req, res) => {
	const customer_id = req.params.customer_id;
	const product_id = req.params.product_id;
	const query = `
      DELETE
      FROM basketEntries
      WHERE customer_id = ? AND product_id = ?
    `;
	db.run(query, [customer_id, product_id], function (err) {
		if (err) {
			console.error("Error deleting product from basket:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		if (this.changes === 0) {
			return res.status(404).json({ error: "Item in basket not found" });
		}
		res.status(200).json({ message: "Product deleted from basket" });
	});
	db.delete;
});

app.put("/customers/:customer_id/basket/:product_id", (req, res) => {
	const customer_id = req.params.customer_id;
	const product_id = req.params.product_id;
	const query = `
	  INSERT INTO basketEntries (customer_id, product_id, quantity)
	  VALUES (?, ?, -1)
	  ON CONFLICT(customer_id, product_id)
	  DO UPDATE
		SET quantity = quantity - 1;
	`;

	if (!customer_id || !product_id) {
		return res
			.status(400)
			.json({ error: "customer_id and product_id are required" });
	}

	if (!db) {
		return res.status(500).json({ error: "Database not yet initialized" });
	}

	db.run(query, [customer_id, product_id], function (err) {
		if (err) {
			console.error("Error updating basketEntry:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		return res
			.status(200)
			.send(
				`Product with ID: ${product_id} decremented for customer with ID: ${customer_id}`
			);
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
