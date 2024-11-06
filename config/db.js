const knex = require('knex');

const db = knex({
  client: 'mysql2', 
  connection: {
    host: 'localhost',
    user: 'root',      
    password: process.env.MYSQL_DATABASE_PASSWORD, 
    database: process.env.MYSQL_DATABASE_NAME,
    port: 3306
  }
});

module.exports = db;
