const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadApiDataInDb = require("./src/utils/loadApiDataInDb.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    await loadApiDataInDb();
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
