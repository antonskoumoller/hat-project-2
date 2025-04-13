const express = require("express");
//Router is created (used for modular routing)
const router = express.Router();

const db = require("../db/connection.js");

// Endpoint to get all customers
router.get("/", (req, res) => {
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
router.post("/", (req, res) => {
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
			console.error("Error creating Customer:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}
		res.status(201).send(`Customer ${name} created`);
	});
});

// Endpoint to get customer with id
router.get("/:id", (req, res) => {

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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

//-----------------------------
//TODO: Maybe basket can get own router?
//And maybe simplify the path to basket?
//-----------------------------

// GET /customers/:id/basket
router.get("/:id/basket", (req, res) => {
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



router.post("/:customer_id/basket/:product_id", (req, res) => {
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

	if (!db) {
		return res.status(500).json({ error: "Database not yet initialized" });
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
router.get("/:customer_id/basket/:product_id", (req, res) => {
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
router.delete("/:id/basket", (req, res) => {
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
      message: `Deleted ${this.changes} item(s) from basket.`,
    });
  });
});

router.delete("/:customer_id/basket/:product_id", (req, res) => {
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

router.put("/:customer_id/basket/:product_id", (req, res) => {
	const customer_id = req.params.customer_id;
	const product_id = req.params.product_id;
	const query = `
	  INSERT INTO basketEntries (customer_id, product_id, quantity)
	  VALUES (?, ?, -1)
	  ON CONFLICT(customer_id, product_id)
	  DO UPDATE
		SET quantity = quantity - 1;
	`;

	// If you’d rather new rows start at 0, just use VALUES (?, ?, 0) instead
	// and still do SET quantity = quantity - 1 in the ON CONFLICT clause.

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

module.exports = router;