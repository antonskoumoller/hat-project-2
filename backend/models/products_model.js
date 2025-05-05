const util = require("util");
const db = require("../db/connection.js");

//Creates promise-based versions of the callback-based data-base-functions
const dbRun = util.promisify(db.run.bind(db));
const dbAll = util.promisify(db.all.bind(db));
const dbGet = util.promisify(db.get.bind(db));

async function getAllProducts() {
	//Check for case where data-base isn't load yet (unlikely)
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = "SELECT * FROM products";
	const rows = await dbAll(query);
	return rows;
}

async function getProductWithId(product_id) {
	//Check for case where data-base isn't load yet (unlikely)
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	//make query-string and return queried result
	const query = "SELECT * FROM products WHERE id = ?";
	const row = await dbGet(query, [product_id]);
	return row;
}



//exports:
exports.getAllProducts = getAllProducts;
exports.getProductWithId =  getProductWithId;