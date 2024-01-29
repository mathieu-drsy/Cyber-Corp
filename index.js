const express = require('express');
const path = require('path');
const initDb = require('./db_init');

const app = express();
const port = 3000;

const db=initDb();

app.get('/', (req, res) => {
  // Exemple : insérer des données dans la base de données
  db.run("INSERT INTO data (pseudo, score, difficulté, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)", ["test", 420, 3, 3, 0, "test"]);
  

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

app.get('/q_raw', (req, res) => {
  // Récupérer des données depuis la base de données
  db.all("SELECT * FROM questions", (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    // Envoyer les données en réponse HTTP
    res.send(rows);
  });
});

app.post('/difficulteNovice', (req, res) => {
  // Exemple : insérer des données dans la base de données avec difficulté 1
  db.run("INSERT INTO data (pseudo, score, difficulté, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)", ["Novice", 420, 1, 3, 0, "test"], (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.status(200).send("Difficulté Novice sélectionnée");
  });
});

// Ajoutez cette route après la création de la base de données dans votre fichier index.js
app.post('/difficulteIntermediaire', (req, res) => {
  // Exemple : insérer des données dans la base de données avec difficulté 1
  db.run("INSERT INTO data (pseudo, score, difficulté, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)", ["Novice", 420, 2, 3, 0, "test"], (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.status(200).send("Difficulté Novice sélectionnée");
  });
});

// Ajoutez cette route après la création de la base de données dans votre fichier index.js
app.post('/difficulteExpert', (req, res) => {
  // Exemple : insérer des données dans la base de données avec difficulté 1
  db.run("INSERT INTO data (pseudo, score, difficulté, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)", ["Novice", 420, 3, 3, 0, "test"], (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.status(200).send("Difficulté Novice sélectionnée");
  });
});

app.get('/view', (req, res) => {
  // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Nettoyer la table 'questions' à l'arrêt du serveur npm
process.on('exit', () => {
  db.run("DELETE FROM questions");
  console.log('Table "questions" vidée.');
});

app.listen(port, () => {
  console.log(`Fonctionnel sur http://localhost:${port}`);
});