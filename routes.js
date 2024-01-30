const path = require('path');

function setupRoutes(app, db) {
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

    app.post('/difficulte', (req, res) => {
      const difficultyValue = req.body.difficulty;
      // Utilisez la valeur de difficulté comme vous le souhaitez
      // Exemple : insérer des données dans la base de données
      db.run("INSERT INTO data (pseudo, score, difficulté, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)", ["MODIF", 420, difficultyValue, 3, 0, "test"], (err) => {
          if (err) {
              return res.status(500).send(err.message);
          }
  
          res.status(200).send(`Difficulté ${difficultyValue} sélectionnée`);
      });
  });
    app.get('/index', (req, res) => {
    // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
    });

    app.get('/transition', (req, res) => {
      // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
      res.sendFile(path.join(__dirname, 'view/transition', 'transition.html'));
      });

      app.get('/terminal', (req, res) => {
        // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
        res.sendFile(path.join(__dirname, 'view', 'terminal.html'));
        });

    app.get('/stop', (req, res) => {
    // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
    res.sendFile(path.join(__dirname, 'view', 'stop.html'));
    });

    app.get('/get-questions', (req, res) => {
        const difficulty = req.query.difficulty; // Récupérer la difficulté à partir de la query string
        const sql = "SELECT * FROM questions WHERE difficulte = ? ORDER BY RANDOM() LIMIT 3"; // Sélectionner 3 questions aléatoires
    
        db.all(sql, [parseInt(difficulty)], (err, rows) => {
            if (err) {
                return res.status(500).send('Une erreur est survenue lors de la récupération des questions.');
            }
            res.send(rows); // Renvoyer les données récupérées
        });
    });
    app.get('/get3q', (req, res) => {
        // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
        res.sendFile(path.join(__dirname, 'view', 'get-q.html'));
        });
    
    // Route pour arrêter le serveur
    app.post('/clear-questions', (req, res) => {
    // Nettoyer la table 'questions'
    db.run("DELETE FROM questions");
    console.log('Table "questions" vidée.');
    });
}

module.exports = { setupRoutes };