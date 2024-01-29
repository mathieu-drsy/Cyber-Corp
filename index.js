const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Création d'une base de données SQLite et d'une table simple
const db = new sqlite3.Database('mydatabase.db');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, pseudo TEXT, score INTEGER, difficulté INTEGER, vie INTEGER, etage INTEGER, mdp TEXT)");
});

app.get('/', (req, res) => {
  // Exemple : insérer des données dans la base de données
  db.run("INSERT INTO messages (content) VALUES (?)", ["Hello from SQLite!"]);

  // Récupérer des données depuis la base de données
  db.all("SELECT * FROM messages", (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    // Envoyer les données en réponse HTTP
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});