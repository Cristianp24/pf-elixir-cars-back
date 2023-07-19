const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
  await conn.sync({force:false});
  console.log('%s listening at 3001'); // eslint-disable-line no-console
});
});
