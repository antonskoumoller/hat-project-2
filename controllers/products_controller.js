const express = require('express');
//Router is created (used for modular routing)
const router = express.Router();

const db = require("../db/connection.js");

//In general the relative paths are used (product not included)

// Get all product categories 
router.get("/categories", (req, res) => {
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
router.get("/:id", (req, res) => {
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

// Endpoint to get all products with category name
router.get("/categories/:categoryName", (req, res) => {
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

//Export statement for the router (old notation conforming to require, so that conventions won't be mixed)
module.exports = router;