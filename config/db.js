const knex = require('knex');

const db = knex({
  client: 'mysql2', 
  connection: {
    host: process.env.HOST,
    user: process.env.USER,      
    password: process.env.MYSQL_DATABASE_PASSWORD, 
    database: process.env.MYSQL_DATABASE_NAME,
    port: process.env.DATABASE_PORT
  }
});

module.exports = db;
