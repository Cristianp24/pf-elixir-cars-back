const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT ||3001;



conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
  await conn.sync({force:false});

  console.log('Server raised in port      ' + PORT);
})
  
});


