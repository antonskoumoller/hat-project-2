

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
  price FLOAT NOT NULL,
  category TEXT
);

-- Create basketEntries
CREATE TABLE IF NOT EXISTS basketEntries (
  customer_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  PRIMARY KEY (customer_id, product_id),
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);


