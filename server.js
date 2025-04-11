const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const productsRoute = require('./controllers/products_controller.js');
const customersRoute = require('./controllers/customers_controller.js');

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

//For all prefixes /products, we use the imported productRoute
app.use('/products',productsRoute);
//likewise for customers
app.use('/customers',customersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});