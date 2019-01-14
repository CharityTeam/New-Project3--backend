// configure postgres to connect our db to our express app
const pgPromise = require('pg-promise');
const pgInstance = pgPromise();

const config = {
  host: 'localhost',
  port: 5432,
  database: 'charity_db',
  user: 'postgres', // your username here!!
  password: 8899253
 
}

const connection = pgInstance(config);

module.exports = connection;