# Database stuff

## Database schema

In the `schemas.sql` file we will define all the tables we need to hold our data. So far I have only built the customers table and products table.

I suggest we take notes about the tables we need below.

### `customers` table

Unique `id` generated when an entry is inserted.

`name` Text

`email` Text. Maybe require format defined by regex? `*@*.*` ??

`password` Text

### `products` table

`id`: Unique and used as primary key
`name`: Text
`img` : path to picture in image dir
`description` : Text
`fullDescription` : Text
`category` : Text
`popular` : Boolean
`price`: decimal number
`brand`: Text

### `basketEnitries` table

`customer_id` : ref to customer
`product_id` : ref to product
`Quantity` : int
Primary Key: (c_id, p_id)

## Filling up the db

The `seed.sql` will fill up our DB with data for the webshop.
