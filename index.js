const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Création d'une base de données SQLite et d'une table simple
const db = new sqlite3.Database('save.db');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, pseudo TEXT, score INTEGER, difficulte INTEGER, vie INTEGER, etage INTEGER, mdp TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY, difficulte INTEGER, texte TEXT, reponse TEXT)");
});

app.get('/', (req, res) => {
  // Exemple : insérer des données dans la base de données
  db.run("INSERT IGNORE INTO data (pseudo, score, difficulté, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)", ["test", 420, 3, 3, 0, "test"]);

  // Récupérer des données depuis la base de données
  db.all("SELECT * FROM data", (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    // Envoyer les données en réponse HTTP
    res.send(rows);
  });

  //SELECTION QUESTIONS
    //SELECT {3 questions} FROM questions WHERE questions.difficulte EQUALS data.difficulte
});

// process.on('exit', () => {
//   const db = new sqlite3.Database('save.db');
//   db.run("DROP DATABASE data");
//   db.close();
//   console.log('Base de données nettoyée.');
// });

app.listen(port, () => {
  console.log(`Fonctionnel sur http://localhost:${port}`);
});