const path = require("path");
const bcrypt = require("bcrypt");

function setupRoutes(app, db) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "index.html"));
  });

  app.get("/q_raw", (req, res) => {
    // Récupérer des données depuis la base de données
    db.all("SELECT * FROM questions", (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      // Envoyer les données en réponse HTTP
      res.send(rows);
    });
  });

  app.post("/setDifficulte", (req, res) => {
    const difficultyValue = req.body.difficulty;
    const pseudo = "moi@gmail.com";
    // Utilisez la valeur de difficulté comme vous le souhaitez
    // Exemple : insérer des données dans la base de données
    const sql = "UPDATE data SET difficulté = ? WHERE pseudo = ?";

    db.run(sql, [difficultyValue, pseudo], (err) => {
      if (err) {
        console.error("Error updating lives in the database:", err);
        return res
          .status(500)
          .json({
            success: false,
            error: "Error updating lives in the database",
          });
      }

      console.log(
        `Updated difficulty for ${pseudo} - Difficulté: ${difficultyValue}`
      );
      res.json({ success: true });
    });
  });

  app.post("/connexion", async (req, res) => {
    const usernameValue = req.body.username;
    const passwordValue = req.body.password;

    try {
      // 1. Récupérer l'utilisateur existant par le nom d'utilisateur
      const existingUser = await getUserByUsername(usernameValue);

      if (existingUser) {
        // 2. L'utilisateur existe
        // 3. Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(
          passwordValue,
          existingUser.mdp
        );

        if (passwordMatch) {
          // Le mot de passe correspond, afficher un log et envoyer une réponse appropriée
          console.log("Connexion réussie");
          //res.status(200).send('Connexion réussie');
        } else {
          // Le mot de passe ne correspond pas, afficher un log et envoyer une réponse appropriée
          console.log("Mot de passe incorrect");
          res.sendFile(path.join(__dirname, "login", "login.html"));
        }
      } else {
        console.log("L'utilisateur n'existe pas");
        res.sendFile(path.join(__dirname, "login", "login.html"));
      }
    } catch (error) {}
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

  app.post("/setVie", (req, res) => {
    const { pseudo, remainingLives } = req.body;

    // Mise à jour de la valeur de la colonne 'vie' dans la base de données
    const sql = "UPDATE data SET vie = ? WHERE pseudo = ?";

    db.run(sql, [remainingLives, pseudo], (err) => {
      if (err) {
        console.error("Error updating lives in the database:", err);
        return res
          .status(500)
          .json({
            success: false,
            error: "Error updating lives in the database",
          });
      }

      console.log(
        `Updated lives for ${pseudo} - Remaining Lives: ${remainingLives}`
      );
      res.json({ success: true });
    });
  });

  app.get("/getVie/:pseudo", (req, res) => {
    const pseudo = req.params.pseudo;

    // Sélection du nombre de vies depuis la base de données
    const sql = "SELECT vie FROM data WHERE pseudo = ?";

    db.get(sql, [pseudo], (err, row) => {
      if (err) {
        console.error("Error getting lives from the database:", err);
        return res
          .status(500)
          .json({
            success: false,
            error: "Error getting lives from the database",
          });
      }

      if (row) {
        console.log(
          `Retrieved lives for ${pseudo} - Remaining Lives: ${row.vie}`
        );
        res.json({ success: true, lives: row.vie });
      } else {
        console.log(`User ${pseudo} not found in the database`);
        res
          .status(404)
          .json({ success: false, error: "User not found in the database" });
      }
    });
  });

  app.get("/getDifficulte/:pseudo", (req, res) => {
    const pseudo = req.params.pseudo;

    // Sélection du nombre de vies depuis la base de données
    const sql = "SELECT difficulte FROM data WHERE pseudo = ?";

    db.get(sql, [pseudo], (err, row) => {
      if (err) {
        console.error("Error getting lives from the database:", err);
        return res
          .status(500)
          .json({
            success: false,
            error: "Error getting lives from the database",
          });
      }

      if (row) {
        console.log(
          `Retrieved lives for ${pseudo} - Difficulte: ${row.difficulte}`
        );
        res.json({ success: true, lives: row.difficulte });
      } else {
        console.log(`User ${pseudo} not found in the database`);
        res
          .status(404)
          .json({ success: false, error: "User not found in the database" });
      }
    });
  });

  app.get("/getScore/:pseudo", (req, res) => {
    const pseudo = req.params.pseudo;
    // Sélection du nombre de vies depuis la base de données
    const sql = "SELECT score FROM data WHERE pseudo = ?";

    db.get(sql, [pseudo], (err, row) => {
      if (err) {
        console.error(
          "Erreur lors de la mise à jour du score dans la db:",
          err
        );
        return res
          .status(500)
          .json({
            success: false,
            error: "Erreur lors de la lecture du score dans la db",
          });
      }

      if (row) {
        //console.log(`Score de ${pseudo} - Score: ${row.score}`);
        res.json({ score: row.score });
      } else {
        console.log(`L'utilisateur ${pseudo} n'est pas dans la db`);
        res
          .status(404)
          .json({
            success: false,
            error: "Utilisateur introuvable dans la db",
          });
      }
    });
  });

  app.post("/setScore", (req, res) => {
    const { pseudo, userScore } = req.body;
    console.log(userScore);
    // Mise à jour de la valeur de la colonne 'vie' dans la base de données
    const sql = "UPDATE data SET score = ? WHERE pseudo = ?";

    db.run(sql, [userScore, pseudo], (err) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du score:", err);
        return res
          .status(500)
          .json({ success: false, error: "Erreur de la mise à jour de la db" });
      }

      console.log(`Mise à jour du Score de ${pseudo} - Score: ${userScore}`);
      res.json({ success: true });
    });
  });

  app.get("/getEtage/:pseudo", (req, res) => {
    const pseudo = req.params.pseudo;
    // Sélection du nombre de vies depuis la base de données
    const sql = "SELECT etage FROM data WHERE pseudo = ?";

    db.get(sql, [pseudo], (err, row) => {
      if (err) {
        console.error(
          "Erreur lors de la mise à jour du score dans la db:",
          err
        );
        return res
          .status(500)
          .json({
            success: false,
            error: "Erreur lors de la lecture du score dans la db",
          });
      }

      if (row) {
        res.json({ etage: row.etage });
      } else {
        console.log(`L'utilisateur ${pseudo} n'est pas dans la db`);
        res
          .status(404)
          .json({
            success: false,
            error: "Utilisateur introuvable dans la db",
          });
      }
    });
  });

  app.post("/setEtage", (req, res) => {
    const { pseudo, userEtage } = req.body;
    console.log(userEtage);
    // Mise à jour de la valeur de la colonne 'vie' dans la base de données
    const sql = "UPDATE data SET etage = ? WHERE pseudo = ?";

    db.run(sql, [userEtage, pseudo], (err) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du score:", err);
        return res
          .status(500)
          .json({ success: false, error: "Erreur de la mise à jour de la db" });
      }

      console.log(`Mise à jour du Score de ${pseudo} - Score: ${userEtage}`);
      res.json({ success: true });
    });
  });

  app.get("/transition", (req, res) => {
    // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
    res.sendFile(path.join(__dirname, "view/transition", "transition.html"));
  });

  app.get("/terminal", (req, res) => {
    // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
    res.sendFile(path.join(__dirname, "view", "terminal.html"));
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login", "login.html"));
  });

  app.post("/inscription", async (req, res) => {
    const usernameValue = req.body.username;
    const passwordValue = req.body.password;

    try {
      // 1. Récupérer l'utilisateur existant par le nom d'utilisateur
      const existingUser = await getUserByUsername(usernameValue);

      if (existingUser) {
        console.log(
          "Utilisateur " + '"' + usernameValue + '"' + " existe déjà"
        );
        return res
          .status(409)
          .json({ success: false, error: "Utilisateur déjà existant" });
      } else {
        // L'utilisateur n'existe pas, procéder à l'inscription
        const hashedPassword = await bcrypt.hash(passwordValue, 10);
        db.run(
          "INSERT INTO data (pseudo, score, difficulte, vie, etage, mdp) VALUES (?, ?, ?, ?, ?, ?)",
          [usernameValue, 0, 0, 0, 0, hashedPassword],
          (err) => {
            if (err) {
              console.error(
                "Erreur lors de l'insertion de l'utilisateur dans la base de données:",
                err
              );
              return res
                .status(500)
                .json({
                  success: false,
                  error:
                    "Erreur lors de l'insertion de l'utilisateur dans la base de données",
                });
            }

            console.log("Utilisateur ajouté avec succès");
            return res
              .status(200)
              .json({
                success: true,
                message: "Utilisateur ajouté avec succès",
              });
          }
        );
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur:", error);
      return res
        .status(500)
        .json({
          success: false,
          error: "Erreur lors de la vérification de l'utilisateur",
        });
    }
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

  app.get("/get-questions", (req, res) => {
    const difficulty = req.query.difficulty; // Récupérer la difficulté à partir de la query string
    const sql =
      "SELECT * FROM questions WHERE difficulté = ? ORDER BY RANDOM() LIMIT 3"; // Sélectionner 3 questions aléatoires

    db.all(sql, [parseInt(difficulty)], (err, rows) => {
      if (err) {
        return res
          .status(500)
          .send(
            "Une erreur est survenue lors de la récupération des questions."
          );
      }
      res.send(rows); // Renvoyer les données récupérées
    });
  });

  app.get("/get3q", (req, res) => {
    // Utilisez la méthode sendFile pour renvoyer la page index.html située dans le répertoire 'view'
    res.sendFile(path.join(__dirname, "view", "get-q.html"));
  });

  // Route pour arrêter le serveur
  app.post("/clear-questions", (req, res) => {
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

  app.post("/setMaxVie", (req, res) => {
    const { pseudo, maxvie } = req.body;

    // Mise à jour de la valeur de la colonne 'vie' dans la base de données
    const sql = "UPDATE maxData SET max_vie = ? WHERE pseudo = ?";

    db.run(sql, [maxvie, pseudo], (err) => {
      if (err) {
        console.error("Error updating MAX lives in the database:", err);
        return res
          .status(500)
          .json({
            success: false,
            error: "Error updating MAX lives in the database",
          });
      }

      console.log(`Updated lives for ${pseudo} - Remaining Lives: ${maxvie}`);
      res.json({ success: true });
    });
  });

  app.get("/getMaxVie/:pseudo", (req, res) => {
    const pseudo = req.params.pseudo;

    // Sélection du nombre de vies depuis la base de données
    const sql = "SELECT max_vie FROM maxData WHERE pseudo = ?";

    db.get(sql, [pseudo], (err, row) => {
      if (err) {
        console.error("Error getting MAX lives from the database:", err);
        return res
          .status(500)
          .json({
            success: false,
            error: "Error getting MAX lives from the database",
          });
      }

      if (row) {
        res.json({ success: true, maxvie: row.max_vie });
      } else {
        console.log(`User ${pseudo} not found in the database`);
        res
          .status(404)
          .json({ success: false, error: "User not found in the database" });
      }
    });
  });

  app.get("/getMaxScore/:pseudo", (req, res) => {
    const pseudo = req.params.pseudo;
    // Sélection du nombre de vies depuis la base de données
    const sql = "SELECT max_score FROM maxData WHERE pseudo = ?";

    db.get(sql, [pseudo], (err, row) => {
      if (err) {
        console.error(
          "Erreur lors de la mise à jour du score MAX dans la db:",
          err
        );
        return res
          .status(500)
          .json({
            success: false,
            error: "Erreur lors de la lecture du score MAX dans la db",
          });
      }

      if (row) {
        res.json({ maxscore: row.max_score });
      } else {
        console.log(`L'utilisateur ${pseudo} n'est pas dans la db`);
        res
          .status(404)
          .json({
            success: false,
            error: "Utilisateur introuvable dans la db",
          });
      }
    });
  });

  app.post("/setMaxScore", (req, res) => {
    const { pseudo, maxscore } = req.body;
    console.log(maxscore);
    // Mise à jour de la valeur de la colonne 'vie' dans la base de données
    const sql = "UPDATE maxData SET max_score = ? WHERE pseudo = ?";

    db.run(sql, [maxscore, pseudo], (err) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du score MAX:", err);
        return res
          .status(500)
          .json({ success: false, error: "Erreur de la mise à jour de la db" });
      }

      console.log(`Mise à jour du Score de ${pseudo} - Score: ${maxscore}`);
      res.json({ success: true });
    });
  });

  app.get("/getMaxEtage/:pseudo", (req, res) => {
    const pseudo = req.params.pseudo;
    // Sélection du nombre de vies depuis la base de données
    const sql = "SELECT max_etage FROM maxData WHERE pseudo = ?";

    db.get(sql, [pseudo], (err, row) => {
      if (err) {
        console.error(
          "Erreur lors de la mise à jour de l'étage MAX dans la db:",
          err
        );
        return res
          .status(500)
          .json({
            success: false,
            error: "Erreur lors de la lecture de l'étage MAX dans la db",
          });
      }

      if (row) {
        res.json({ maxetage: row.max_etage });
      } else {
        console.log(`L'utilisateur ${pseudo} n'est pas dans la db`);
        res
          .status(404)
          .json({
            success: false,
            error: "Utilisateur introuvable dans la db",
          });
      }
    });
  });

  app.post("/setMaxEtage", (req, res) => {
    const { pseudo, maxetage } = req.body;
    console.log(maxetage);
    // Mise à jour de la valeur de la colonne 'vie' dans la base de données
    const sql = "UPDATE maxData SET max_etage = ? WHERE pseudo = ?";

    db.run(sql, [maxetage, pseudo], (err) => {
      if (err) {
        console.error("Erreur lors de la mise à jour etage MAX:", err);
        return res
          .status(500)
          .json({ success: false, error: "Erreur de la mise à jour de la db" });
      }

      console.log(`Mise à jour du Score de ${pseudo} - Score: ${maxetage}`);
      res.json({ success: true });
    });
  });

  app.post("/reset-stats", (req, res) => {
    const { pseudo } = req.body;

    // Update the 'Score' and 'Etage' fields to 0 in the database
    const sql =
      "UPDATE data SET score = 0, etage = 0, vie = 3 WHERE pseudo = ?";

    db.run(sql, [pseudo], (err) => {
      if (err) {
        console.error("Error resetting stats:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error resetting stats" });
      }

      console.log(`Stats reset for ${pseudo}`);
      res.json({ success: true });
    });
  });
}

module.exports = { setupRoutes };
