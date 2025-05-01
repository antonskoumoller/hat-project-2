const express = require("express");
const app = express();
const productsRoute = require('./routes/products_route.js');
const customersRoute = require('./routes/customers_route.js');


app.use(express.json());
//For all prefixes /products, we use the imported productRoute
app.use('/products',productsRoute);
//likewise for customers
app.use('/customers',customersRoute);

//catch-all route for wrong unspecified URL's
app.get('*', (req, res) => {
    res.status(404).json({error : 'This is an invalid URL.'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});