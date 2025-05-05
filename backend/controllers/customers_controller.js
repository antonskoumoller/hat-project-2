const customers = require("../../models/customers_model.js");

// Endpoint to get all customers
async function getAllCustomers(_req, res) {
	try {
		const rows = await customers.getAllCustomers();
		if (rows.length === 0) {
			res.status(404).json({ error: "No customers in database" });
			return;
		}
		res.status(200).json(rows);
	} catch (err) {
		console.error("Error retrieving Customers:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

//Endpoint to create a new customer
async function insertCustomer(req, res) {
	const { name, email, password } = req.body;
	// Validate input
	if (!name || !email || !password) {
		res.status(400).json({
			error: "Name, email, and password are required"
		});
		return;
	}
	try {
		await customers.insertCustomer(name, email, password);
		res.status(201).send(`Customer ${name} created`);
	} catch (err) {
		console.error("Error creating Customer:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

// Endpoint to get customer with id
async function getCustomerWithId(req, res) {
	const customerId = req.params.id;
	try {
		let row = await customers.getCustomerWithId(customerId);
		if (row === undefined) {
			res.status(404).json({ error: "Customer not found" });
			return;
		}
		res.status(200).json(row);
	} catch (err) {
		console.error("Error retrieving Customer:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

// Update customer with id
async function updateCustomer(req, res) {
	const customerId = req.params.id;
	const { name, email, password } = req.body;

	// Validate input (Is nescessary beause we want the front-end to handle updating the object and then giving it to the back-end with all fields)
	if (!name || !email || !password) {
		res.status(400).json({
			error: "Name, email, and password are required"
		});
		return;
	}
	try {
		const changed = await customers.updateCustomer(
			name,
			email,
			password,
			customerId
		);
		// if no changes were made
		if (!changed) {
			res.status(404).json({ error: "Customer not found" });
			return;
		}
		res.status(200).json({
			message: `Customer with id:${customerId} updated successfully`
		});
	} catch (err) {
		console.error("Error updating Customer:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

//Delete customer with id
async function deleteCustomerWithId(req, res) {
	const customerId = req.params.id;
	try {
		const changed = await customers.deleteCustomerWithId(customerId);
		// if no changes were made
		if (!changed) {
			res.status(404).json({ error: "Customer not found" });
			return;
		}
		res.status(200).json({
			message: "Customer deleted"
		});
	} catch (err) {
		console.error("Error deleting Customer:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

// GET /customers/:id/basket
async function getBasketWithId(req, res) {
	const customerId = req.params.id;
	try {
		const basket = await customers.getBasketWithId(customerId);
		res.status(200).json(basket);
	} catch (err) {
		console.error("Error retrieving basket:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

//Adds product with id "product_id" to basket for customer with id "customer_id"
async function insertIntoBasket(req, res) {
	const customer_id = req.params.customer_id;
	const product_id = req.params.product_id;
	if (!customer_id || !product_id) {
		res.status(400).json({
			error: "customer_id and product_id are required"
		});
		return;
	}
	try {
		await customers.insertIntoBasket(customer_id, product_id);
		res.status(201).send(
			`Product with ID: ${product_id} added to customer with ID: ${customer_id}`
		);
	} catch (err) {
		console.error("Error creating updating basketEntry:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

// GET /customers/:id/basket
async function getQuantity(req, res) {
	const customer_id = req.params.customer_id;
	const product_id = req.params.product_id;
	try {
		const row = await customers.getQuantity(customer_id, product_id);
		//If product not in basket
		if (row === undefined) {
			res.status(404).json({
				error: "Product not found in this customers basket"
			});
			return;
		}
		res.status(200).json(row);
	} catch (err) {
		console.error("Error retrieving quantity:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

// DELETE /customers/:id/basket
async function emptyBasket(req, res) {
	const customerId = req.params.id;
	try {
		await customers.emptyBasket(customerId);
		res.status(200).json({
			message: `Basket for customer ${customerId} is now emptied`
		});
	} catch (err) {
		console.error("Error emptying basket:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function deleteProductFromBasket(req, res) {
	const customer_id = req.params.customer_id;
	const product_id = req.params.product_id;
	try {
		await customers.deleteProductFromBasket(customer_id, product_id);
		res.status(200).json({ message: "Product deleted from basket" });
	} catch (err) {
		console.error("Error deleting product from basket:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function deleteOneProductFromBasket(req, res) {
	const customer_id = req.params.customer_id;
	const product_id = req.params.product_id;
	if (!customer_id || !product_id) {
		res.status(400).json({
			error: "customer_id and product_id are required"
		});
		return;
	}
	try {
		await customers.deleteOneProductFromBasket(customer_id, product_id);
		res.status(200).send(
			`Product with ID: ${product_id} decremented for customer with ID: ${customer_id}`
		);
	} catch (err) {
		console.error("Error updating basketEntry:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

exports.getAllCustomers = getAllCustomers;
exports.insertCustomer = insertCustomer;
exports.getCustomerWithId = getCustomerWithId;
exports.updateCustomer = updateCustomer;
exports.deleteCustomerWithId = deleteCustomerWithId;
exports.getBasketWithId = getBasketWithId;
exports.insertIntoBasket = insertIntoBasket;
exports.getQuantity = getQuantity;
exports.emptyBasket = emptyBasket;
exports.deleteProductFromBasket = deleteProductFromBasket;
exports.deleteOneProductFromBasket = deleteOneProductFromBasket;
