const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadApiDataInDb = require("./src/utils/loadApiDataInDb.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    await loadApiDataInDb();
    console.log("%s listening at ", process.env.PORT); // eslint-disable-line no-console
  });
});

server.get("/", (req, res) => {
  res.send("Hello World!");
});