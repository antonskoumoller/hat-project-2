const express = require("express");
const router = express.Router();
const controller = require("../controllers/products_controller.js");

router.get("/", controller.getAllProducts);

router.get("/categories", controller.getAllCategories);

router.get("/:id", controller.getProductWithId);

router.get("/categories/:categoryName", controller.getCategory);

module.exports = router;