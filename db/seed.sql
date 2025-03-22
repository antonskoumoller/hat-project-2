-- Insert sample customers
INSERT INTO customers (name, email, password) VALUES ('Andreas', 'andreas@mail.com', 'funny123');
INSERT INTO customers (name, email, password) VALUES ('Anne', 'anne@mail.com', 'simplepass');
INSERT INTO customers (name, email, password) VALUES ('Anton', 'anton@mail.com', 'password1');
INSERT INTO customers (name, email, password) VALUES ('Sebastian', 'sebastian@mail.com', 'qwerty');
INSERT INTO customers (name, email, password) VALUES ('Emil', 'emil@mail.com', 'emil123');

INSERT INTO products (id, name, description, price, category) VALUES ('1', 'Funny Hat', 'If you want to be fun', 3.5,'Fun');
INSERT INTO products (id, name, description, price, category) VALUES ('2', 'Red Hat', 'If you want to be red', 5.4,'Fun');
INSERT INTO products (id, name, description, price, category) VALUES ('3', 'Another Hat', 'If you want to be another', 6,'Red');

INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('1', '1', '1');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('1', '2', '1');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('1', '3', '3');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('2', '1', '1');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('3', '1', '4');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('3', '2', '1');
