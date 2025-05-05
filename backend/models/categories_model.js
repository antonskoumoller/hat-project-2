const util = require("util");
const db = require("../db/connection.js");

//Creates promise-based versions of the callback-based data-base-functions
const dbRun = util.promisify(db.run.bind(db));
const dbAll = util.promisify(db.all.bind(db));
const dbGet = util.promisify(db.get.bind(db));

async function getAllCategories() {
	//Check for case where data-base isn't load yet (unlikely)
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	//make query-string and return queried result
	const query = "SELECT DISTINCT category FROM products";
	const rows = await dbAll(query);
	return rows;
}

async function getCategory(categoryName) {
	//Check for case where data-base isn't load yet (unlikely)
	if (!db) {
		throw new Error("Database not yet initialized");
	}
	const query = "SELECT * FROM products WHERE category = ?";
	const rows = await dbAll(query, [categoryName]);
	return rows;
}

exports.getAllCategories =  getAllCategories;
exports.getCategory = getCategory;