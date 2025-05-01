const products = require("../models/products_model.js");

//In general the relative paths are used (product not included)

// Endpoint to retrive all products
async function getAllProducts (_req, res) {
	try {	
		const rows = await products.getAllProducts();
		if (rows.length === 0) {
			res.status(404).json({ error: "No products found" });
			return;
		}
		res.status(200).json(rows);
	} catch (err) {
		console.error("Error retrieving products:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}


// Get all product categories 
async function getAllCategories (req, res) {
	try{
		const rows = await products.getAllCategories();
		res.status(200).json(rows);
	}
	catch(err) {
		console.error("Error retrieving categories:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

//Gets product with id "id"
async function getProductWithId (req, res) {
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

}

// Endpoint to get all products with category name
async function getCategory (req, res) {
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
}

exports.getAllProducts = getAllProducts;
exports.getAllCategories = getAllCategories;
exports.getProductWithId = getProductWithId;
exports.getCategory = getCategory;