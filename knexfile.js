// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME ,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations', // Ensure migrations are stored properly
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds' // Add a seeds directory for test data
    }
  },
};

