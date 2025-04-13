const express = require("express");
const app = express();
const productsRoute = require('./controllers/products_controller.js');
const customersRoute = require('./controllers/customers_controller.js');


app.use(express.json());

//For all prefixes /products, we use the imported productRoute
app.use('/products',productsRoute);
//likewise for customers
app.use('/customers',customersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});