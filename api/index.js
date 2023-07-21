const server = require('./src/app');
const { conn } = require('./src/db.js');
require('dotenv').config()





conn.sync({ force : true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('Server is listening at',process.env.PORT); // eslint-disable-line no-console
  });
});

