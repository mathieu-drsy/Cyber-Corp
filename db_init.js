const sqlite3 = require('sqlite3').verbose();

function initDb() {
    // Création d'une base de données SQLite et d'une table simple
    const db = new sqlite3.Database('save.db');
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, pseudo TEXT, score INTEGER, difficulte INTEGER, vie INTEGER, etage INTEGER, mdp TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY, difficulte INTEGER, texte TEXT, reponse TEXT)");

        db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                const count = row.count;
                if (count === 0) {
                    const questions = [
                        { difficulte: 1, texte: "Question 1 Novice", reponse: "Réponse 1 Novice" },
                        { difficulte: 1, texte: "Question 2 Novice", reponse: "Réponse 2 Novice" },
                        { difficulte: 2, texte: "Question 1 Intermédiaire", reponse: "Réponse 1 Intermédiaire" },
                        { difficulte: 2, texte: "Question 2 Intermédiaire", reponse: "Réponse 2 Intermédiaire" },
                        { difficulte: 3, texte: "Question 1 Avancée", reponse: "Réponse 1 Avancée" },
                        { difficulte: 3, texte: "Question 2 Avancée", reponse: "Réponse 2 Avancée" }
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
    });

    return db;
}

module.exports = initDb;