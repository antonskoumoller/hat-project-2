

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
    img TEXT NOT NULL,
    description TEXT NOT NULL,
    fullDescription TEXT NOT NULL,
    category TEXT NOT NULL,
    popular BOOLEAN NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    brand TEXT NOT NULL
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


CREATE TRIGGER remove_zero_quantity
AFTER UPDATE ON basketEntries
FOR EACH ROW
WHEN NEW.quantity <= 0
BEGIN
  DELETE FROM basketEntries 
  WHERE rowid = NEW.rowid;
END;
