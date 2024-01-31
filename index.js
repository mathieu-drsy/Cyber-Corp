const express = require('express');
const initDb = require('./db_init');
const path = require('path');
const { setupRoutes } = require('./routes');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "view")));


const db=initDb();

setupRoutes(app, db);

app.use(express.json());
app.use(express.static(path.join(__dirname, "view")));

// Ajoutez cette ligne pour servir les fichiers statiques depuis le répertoire 'view'
app.use('/view', express.static(path.join(__dirname, 'view')));

app.listen(port, () => {
  console.log(`Fonctionnel sur http://localhost:${port}`);
});