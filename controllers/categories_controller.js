const categories = require("../models/categories_model.js");

// Get all product categories 
async function getAllCategories (req, res) {
    try{
        const rows = await categories.getAllCategories();
        res.status(200).json(rows);
    }
    catch(err) {
        console.error("Error retrieving categories:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Endpoint to get all products with category name
async function getCategory (req, res) {
	const categoryName = req.params.categoryName;
	try{
		const rows = await categories.getCategory(categoryName);
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

exports.getAllCategories = getAllCategories;
exports.getCategory = getCategory;