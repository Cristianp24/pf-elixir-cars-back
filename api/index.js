const server = require('./src/app');
const { conn } = require('./src/db.js');
require('dotenv').config()
const PORT = process.env.DB_PORT || 3001;



conn.sync({ force : true }).then(() => {
  server.listen(PORT, () => {
    console.log('Server is listening at',PORT); // eslint-disable-line no-console
  });
});

server.get("/", (req, res) => {
  res.send("Hello World!");
});