const express = require("express");
const app = express();
const productsRoute = require("./routes/products_route.js");
const categoriesRoute = require("./routes/categories_route.js");
const customersRoute = require("./routes/customers_route.js");
const cors = require("cors");

app.use(cors());

app.use(express.json());
//For given prefix, we use the given imported route
//(categories listed before products for correct pattern-matching on paths)
app.use("/products/categories", categoriesRoute);
app.use("/products", productsRoute);
app.use("/customers", customersRoute);

//catch-all route for wrong unspecified URL's
app.get("*", (req, res) => {
	res.status(404).json({ error: "This is an invalid URL." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
