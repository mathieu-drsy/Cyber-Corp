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

db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
  if (err) {
    console.error(err.message);
  } else {
    const count = row.count;
    // Si la table est vide, insérer les valeurs initiales
    if (count === 0) {
      const questions = [
        { difficulte: 1, texte: "Question 1", reponse: "Réponse 1" },
        { difficulte: 2, texte: "Question 2", reponse: "Réponse 2" },
        { difficulte: 3, texte: "Question 3", reponse: "Réponse 3" }
        // Ajoutez d'autres questions si nécessaire
      ];
      const stmt = db.prepare("INSERT INTO questions (difficulte, texte, reponse) VALUES (?, ?, ?)");
      questions.forEach(question => {
        stmt.run(question.difficulte, question.texte, question.reponse);
      });
      stmt.finalize();
      console.log("Valeurs initiales insérées dans la table 'questions'.");
    }
  }
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

process.on('exit', () => {
  db.run("DROP DATABASE questions");
  db.close();
  console.log('||TEMP|| questions nettoyées.');
  console.log('Base de donnée fermée proprement.');
});

app.listen(port, () => {
  console.log(`Fonctionnel sur http://localhost:${port}`);
});