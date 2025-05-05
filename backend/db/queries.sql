-- GET /customers
SELECT * FROM customers

-- GET /customers/:id
SELECT * FROM customers WHERE id = ?

-- GET /products
SELECT * FROM products

-- GET /products/:id
SELECT * FROM products WHERE id = ?

-- GET /products/categories
SELECT DISTINCT(category) FROM products

-- GET /products/categories/:categoryName 
SELECT * FROM products WHERE category = ?

-- GET /customers/:id/basket
SELECT * 
    FROM basketEntries
    JOIN products p ON p.id = product_id 
    WHERE customer_id = ?



