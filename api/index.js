const server = require('./src/app');

const { conn } = require('./src/db.js');



const PORT = 3001;

server.listen(PORT, async () => {
  await conn.sync({force:false});
  console.log('Server raised in port      ' + PORT);
})
  

//crear una funcion que llene la base de datos con el json  y luego consumir de ahi 
// force