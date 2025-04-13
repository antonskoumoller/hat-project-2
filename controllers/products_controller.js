const express = require('express');
//Router is created (used for modular routing)
const router = express.Router();

const products = require("../models/products_model.js");

//In general the relative paths are used (product not included)

// Get all product categories 
router.get("/categories", async (req, res) => {
	try{
		const rows = await products.getAllCategories();
		res.status(200).json(rows);
	}
	catch(err) {
		console.error("Error retrieving categories:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

//Gets product with id "id"
router.get("/:id", async (req, res) => {
	const product_id = req.params.id;
	try{
		const row = await products.getProductWithId(product_id);
		//If no rows returned, send error-message and return
		if (row === undefined) {
			res.status(404).json({ error: "No products found" });
			return; 
		}
		res.status(200).json(row);
	}
	catch(err){
		console.error("Error retrieving product:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}

});

// Endpoint to get all products with category name
router.get("/categories/:categoryName", async (req, res) => {
	const categoryName = req.params.categoryName;
	try{
		const rows = await products.getCategory(categoryName);
		if (rows.length === 0) {
			res.status(404).json({ error: "No products found" });
			return; 
		}
		res.status(200).json(rows);
	}
	catch(err){
		console.error("Error retrieving category", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

//Export statement for the router (old notation conforming to require, so that conventions won't be mixed)
module.exports = router;