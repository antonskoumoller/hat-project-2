# hat-project-2

Before you run the project, install all dependencies from `package.json` with following command:

    npm i

Before running the server, you have to initialize the db. The script will rebuild the database based on the `db/schema.sql`file and fill up the database with entries defined in `db/seed.sql`

    npm run init-db

To run the server with hot reload on save run the following command

    npm run dev

If you wish to be able to browse the actual content of the sqlite db you can download this DB browser: https://sqlitebrowser.org/dl/.

1. Download
2. Open app
3. Click "File" in upper left corner
4. "Open database"
5. Open the `../hat-project-2/db/database.db`file
6. Use the "Execute SQL" tab to test queries

Remember to run the `npm run init-db`first. This will create the file. The `database.db` file is .gitignored to avoid silly merge conflicts, so you will have to create it yourself.

Test
