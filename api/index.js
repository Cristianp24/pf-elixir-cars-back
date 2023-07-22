const server = require('./src/app');
const { conn } = require('./src/db.js');
require('dotenv').config();
const { PORT } = process.env;
const loadApiDataInDb = require("./src/utils/loadApiDataInDb.js");


conn.sync({ force : true }).then(() => {
  server.listen(PORT, async () => {
    await loadApiDataInDb();
    console.log('Server is listening at',PORT); // eslint-disable-line no-console
  });
});