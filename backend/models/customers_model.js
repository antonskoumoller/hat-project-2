const util = require("util");
const db = require("../db/connection.js");

//Creates promise-based versions of the callback-based data-base-functions
const dbRun = util.promisify(db.run.bind(db));
const dbAll = util.promisify(db.all.bind(db));
const dbGet = util.promisify(db.get.bind(db));

async function getAllCustomers() {
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = "SELECT * FROM customers";
	const rows = await dbAll(query);
	return rows;
};

async function insertCustomer(name, email, password) {
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query =
		"INSERT INTO customers (name, email, password) VALUES (?, ?, ?)";
	return dbRun(query, [name, email, password]);
}

async function getCustomerWithId(customerId){
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = "SELECT * FROM customers WHERE id = ?";
	const row = await dbGet(query, [customerId]);
	return row;
}

async function updateCustomer(name, email, password, customerId){
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query =
		"UPDATE customers SET name = ?, email = ?, password = ? WHERE id = ?";
	const row = await getCustomerWithId(customerId);
	if(row === undefined){
		return false;
	}
	await dbRun(query, [name, email, password, customerId]);
	return true;
}

async function deleteCustomerWithId(customerId) {
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = "DELETE FROM customers WHERE id = ?";
	const row = await getCustomerWithId(customerId);
	if(row === undefined){
		return false;
	}
	await dbRun(query, [customerId]);
	return true;
}

async function getBasketWithId(customerId) {
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = `
      SELECT *
      FROM basketEntries
      JOIN products p ON p.id = basketEntries.product_id
      WHERE customer_id = ?
    `;
	const basket = await dbAll(query, [customerId]);
	return basket;
}

async function insertIntoBasket(customerId, productId) {
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = `INSERT INTO basketEntries (customer_id, product_id, quantity)
						VALUES (?, ?, 1)
						ON CONFLICT(customer_id, product_id)
						DO UPDATE
							SET quantity = quantity + EXCLUDED.quantity;`;
	await dbRun(query, [customerId, productId]);
	return true;
}

async function getQuantity(customerId, productId){
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = `
      SELECT quantity
      FROM basketEntries
      JOIN products p ON p.id = basketEntries.product_id
      WHERE customer_id = ? AND product_id = ?
    `;

	const row = await dbGet(query, [customerId, productId]);
	return row;
}

async function emptyBasket(customerId) {
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = `
	DELETE FROM basketEntries
	WHERE customer_id = ?
  	`;
  	await dbRun(query, [customerId]);
	return true;
}

async function deleteProductFromBasket(customerId, productId){
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = `
      DELETE
      FROM basketEntries
      WHERE customer_id = ? AND product_id = ?
    `;
	return db.run(query, [customerId, productId]);
}

async function deleteOneProductFromBasket(customerId, productId){
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = `
	  INSERT INTO basketEntries (customer_id, product_id, quantity)
	  VALUES (?, ?, -1)
	  ON CONFLICT(customer_id, product_id)
	  DO UPDATE
		SET quantity = quantity - 1;
	`;

	// If you’d rather new rows start at 0, just use VALUES (?, ?, 0) instead
	// and still do SET quantity = quantity - 1 in the ON CONFLICT clause.
	
	return dbRun(query, [customerId, productId]);
}

//exports
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