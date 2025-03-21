-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  category TEXT
);

-- Create basket table
CREATE TABLE IF NOT EXISTS basket (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customerId INTEGER,
  productId INTEGER,
  quantity INTEGER,
  FOREIGN KEY(customerId) REFERENCES customers(id),
  FOREIGN KEY(productId) REFERENCES products(id)
);

-- Additional SQL commands can go here...
