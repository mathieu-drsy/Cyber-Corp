const express = require('express');
const initDb = require('./db_init');
const { setupRoutes } = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

const db=initDb();

setupRoutes(app, db);

app.listen(port, () => {
  console.log(`Fonctionnel sur http://localhost:${port}`);
});