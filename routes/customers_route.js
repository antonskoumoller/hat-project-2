const express = require("express");
const router = express.Router();
const controller = require("../controllers/customers_controller.js");

router.get("/", controller.getAllCustomers);

router.post("/", controller.insertCustomer)

router.get("/:id", controller.getCustomerWithId);

router.put("/:id", controller.updateCustomer);

router.delete("/:id", controller.deleteCustomerWithId);

router.get("/:id/basket", controller.getBasketWithId);

router.post("/:customer_id/basket/:product_id", controller.insertIntoBasket);

router.get("/:customer_id/basket/:product_id", controller.getQuantity);

router.delete("/:id/basket", controller.emptyBasket);

router.delete("/:customer_id/basket/:product_id", controller.deleteProductFromBasket);

router.put("/:customer_id/basket/:product_id", controller.deleteOneProductFromBasket);

module.exports = router;