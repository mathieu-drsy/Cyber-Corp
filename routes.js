const path = require('path');
const bcrypt = require('bcrypt');

function setupRoutes(app, db) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
    // Exemple : insérer des données dans la base de données
    //db.run("INSERT INTO data (pseudo, score, difficulté, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)", ["test", 420, 3, 3, 0, "test"]);


    // Récupérer des données depuis la base de données
    /*db.all("SELECT * FROM data", (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      // Envoyer les données en réponse HTTP
      res.send(rows);
    });*/

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

  app.post('/setScore', (req, res) => {
    const scoreValue = req.body.score;
    // Utilisez la valeur de difficulté comme vous le souhaitez
    // Exemple : insérer des données dans la base de données
    /*db.run("INSERT INTO data (pseudo, score, difficulté, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)", ["MODIF", 420, difficultyValue, 3, 0, "test"], (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      res.status(200).send(`Difficulté ${difficultyValue} sélectionnée`);
    });*/
    console.log(scoreValue);
  });

  app.post('/connexion', async (req, res) => {
    const usernameValue = req.body.username;
    const passwordValue = req.body.password;

    try {
      // 1. Récupérer l'utilisateur existant par le nom d'utilisateur
      const existingUser = await getUserByUsername(usernameValue);

      if (existingUser) {
        // 2. L'utilisateur existe
        // 3. Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(passwordValue, existingUser.mdp);

        if (passwordMatch) {
          // Le mot de passe correspond, afficher un log et envoyer une réponse appropriée
          console.log('Connexion réussie');
          //res.status(200).send('Connexion réussie');
        } else {
          // Le mot de passe ne correspond pas, afficher un log et envoyer une réponse appropriée
          console.log('Mot de passe incorrect');
          //res.status(401).send('Mot de passe incorrect');
        }
      } 
    } catch (error) {
      //console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      //res.status(500).json({ error: 'Erreur lors de la vérification de l\'utilisateur' });
    }
  });

  /*app.get("/inscription", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "inscription.html"));
  });*/

  app.post('/inscription', async (req, res) => {
    const usernameValue = req.body.username;
    const passwordValue = req.body.password;

    try {
      // 1. Récupérer l'utilisateur existant par le nom d'utilisateur
      const existingUser = await getUserByUsername(usernameValue);

      if (existingUser) {
        console.log('Utilisateur existe déjà');
      }
      else {
        // L'utilisateur n'existe pas, afficher un log et envoyer une réponse appropriée
        const hashedPassword = await bcrypt.hash(passwordValue, 10);
        db.run("INSERT INTO data (pseudo, score, difficulté, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)",
          [usernameValue, 0, 0, 0, 0, hashedPassword], (err) => {
            if (err) {
              return res.status(500).send(err.message);
            }

            console.log('Utilisateur ajouté avec succès');
            res.status(200).send('Utilisateur ajouté avec succès');
          });

        //res.status(404).send('Utilisateur non trouvé');
      }
    } catch (error) {
      //console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      //res.status(500).json({ error: 'Erreur lors de la vérification de l\'utilisateur' });
    }
  });

  // Fonction pour récupérer un utilisateur par nom d'utilisateur
  async function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM data WHERE pseudo = ?", [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  app.get('/transition', (req, res) => {
    // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
    res.sendFile(path.join(__dirname, 'view/transition', 'transition.html'));
  });

  app.get('/terminal', (req, res) => {
    // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
    res.sendFile(path.join(__dirname, 'view', 'terminal.html'));
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login", "login.html"));
  });

  app.get("/inscription", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "inscription.html"));
  });

  app.get("/stat", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "stat.html"));
  });

  app.get("/profil", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "profil.html"));
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

  app.post("/execute-command", (req, res) => {
    const { command } = req.body;
    let output = "";
    let correct = false; // Track if the command was correct

    // Execute specific commands
    switch (command.trim()) {
      case "help":
        output =
          "Available commands:\n- help: Display available commands\n- date: Show current date and time";
        break;
      case "date":
        const currentDate = new Date().toLocaleString();
        output = `Current date and time: ${currentDate}`;
        break;
      case "true":
        // Here, you can define the behavior for the "true" command
        output = "You have chosen to continue.";
        correct = true; // Set correct to true for this command
        break;
      case "false":
        // Here, you can define the behavior for the "true" command
        output = "You have chose to fail.";
        correct = false; // Set correct to true for this command
        break;
      case "restart":
        // Send a specific response to indicate page reload
        res.json({ reload: true });
        return; // Stop further execution
      default:
        output = `Command not found: ${command}`;
        break;
    }

    // Log the command and send back the output along with correct flag
    console.log("Command received:", command);
    res.json({ message: output, correct });
  });

}

module.exports = { setupRoutes };