require("dotenv").config({
  path: "./.env.local",
});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "pg",
  connection: process.env.DB_URL || {
    // ローカル環境では"127.0.0.1" or "localhost"
    // host: process.env.DB_HOST || "127.0.0.1",
    host: process.env.DB_HOST || "postgres",
    port: process.env.DB_PORT || 5432,
    /** ローカル環境ではこれ
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    */
    database: process.env.DB_NAME || "todo_apps",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",

  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
