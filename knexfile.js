require("dotenv").config();
const knex = require("knex");

module.exports = {
	client: "pg",
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false }, // required for Neon
	},
	migrations: {
		directory: "./new_migrations",
		tableName: "knex_migrations",
	},
	seeds: {
		directory: "./new_seeds",
	},
};
