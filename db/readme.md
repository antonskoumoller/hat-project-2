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

## Filling up the db

The `seed.sql` will fill up our DB with data for the webshop.
