const server = require('./src/app');

const { conn } = require('./src/db.js');



const PORT = 3001;

server.listen(PORT, async () => {
  await conn.sync({force:false});
  console.log('Server raised in port      ' + PORT);
})
  