const express = require("express");
const router = express.Router();
const controller = require("../controllers/categories_controller.js");

router.get("/", controller.getAllCategories);

router.get("/:categoryName", controller.getCategory);

module.exports = router;