const express = require("express");
const router = express.Router();
const controller = require("../controllers/products_controller.js");

router.get("/", controller.getAllProducts);

router.get("/:id", controller.getProductWithId);

module.exports = router;