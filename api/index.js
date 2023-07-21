const server = require('./src/app');
const { conn } = require('./src/db.js');
require('dotenv').config()
const pg = require('pg')
const DB_PORT = process.env.DB_PORT || 3001;

const pool = new pg.Pool({
  connectionString:process.env.DB_PORT
})


conn.sync({ force : true }).then(() => {
  server.listen(DB_PORT, () => {
    console.log('Server is listening at',DB_PORT); // eslint-disable-line no-console
  });
});

