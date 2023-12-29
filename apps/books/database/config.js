module.exports = {
  development: {
    schema: process.env.BOOKS_DB_SCHEMA,
    dialect: process.env.BOOKS_DB_DIALECT,
    host: process.env.BOOKS_DB_HOST,
    port: process.env.BOOKS_DB_PORT,
    username: process.env.BOOKS_DB_USERNAME,
    password: process.env.BOOKS_DB_PASSWORD,
    database: process.env.BOOKS_DB_DATABASE,
  },
  production: {
    schema: process.env.BOOKS_DB_SCHEMA,
    dialect: process.env.BOOKS_DB_DIALECT,
    host: process.env.BOOKS_DB_HOST,
    port: process.env.BOOKS_DB_PORT,
    username: process.env.BOOKS_DB_USERNAME,
    password: process.env.BOOKS_DB_PASSWORD,
    database: process.env.BOOKS_DB_DATABASE,
  },
};
