const express = require('express');
const initDb = require('./db_init');
const path = require('path');
const { setupRoutes } = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "view")));


const db=initDb();

setupRoutes(app, db);

app.use(express.json());

app.listen(port, () => {
  console.log(`Fonctionnel sur http://localhost:${port}`);
});