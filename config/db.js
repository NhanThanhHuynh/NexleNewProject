const knex = require('knex');

const db = knex({
  client: process.env.DATABASE_CLIENT, 
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,      
    password: process.env.MYSQL_DATABASE_PASSWORD, 
    database: process.env.MYSQL_DATABASE_NAME,
    port: process.env.DATABASE_PORT
  }
});

module.exports = db;
