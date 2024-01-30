const sqlite3 = require('sqlite3').verbose();

function initDb() {
    // Création d'une base de données SQLite et d'une table simple
    const db = new sqlite3.Database('save.db');
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, pseudo TEXT, score INTEGER, difficulte INTEGER, vie INTEGER, etage INTEGER, mdp TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY, difficulte INTEGER, texte TEXT, reponseA TEXT, reponseB TEXT, reponseC TEXT, bonnereponse INTEGER)");

        db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                const count = row.count;
                if (count === 0) {
                    const questions = [
                        // Niveau 1 (Novice)
                        { difficulte: 1, texte: "Qu'est-ce qu'un pare-feu ?", reponseA: "Un dispositif de sécurité réseau", reponseB: "Un logiciel antivirus", reponseC: "Un programme de messagerie électronique", bonnereponse: 1 },
                        { difficulte: 1, texte: "Quel est le rôle principal d'un antivirus ?", reponseA: "Protéger contre les virus et logiciels malveillants", reponseB: "Optimiser les performances du système", reponseC: "Assurer la sauvegarde des données", bonnereponse: 1 },
                        { difficulte: 1, texte: "Qu'est-ce qu'un hameçonnage (phishing) ?", reponseA: "Une tentative de fraude en ligne pour obtenir des informations sensibles", reponseB: "Un type de logiciel malveillant", reponseC: "Une méthode de sauvegarde des données", bonnereponse: 1 },
                        { difficulte: 1, texte: "Quelle est la meilleure pratique pour créer un mot de passe sécurisé ?", reponseA: "Utiliser une combinaison de lettres, de chiffres et de caractères spéciaux", reponseB: "Utiliser le nom de famille", reponseC: "Utiliser un mot simple", bonnereponse: 1 },
                        { difficulte: 1, texte: "Quelle est la première étape de la sécurité des informations ?", reponseA: "Identifier les actifs à protéger", reponseB: "Mettre en œuvre des pare-feux", reponseC: "Définir une politique de sécurité", bonnereponse: 1 },
                        { difficulte: 1, texte: "Qu'est-ce qu'un logiciel malveillant ?", reponseA: "Un programme conçu pour endommager ou perturber un système informatique", reponseB: "Un outil de sauvegarde de fichiers", reponseC: "Un service d'assistance technique", bonnereponse: 1 },
                    
                        // Niveau 2 (Intermédiaire)
                        { difficulte: 2, texte: "Quelle est la différence entre un virus et un ver informatique ?", reponseA: "Un virus a besoin d'un hôte pour se propager, tandis qu'un ver peut se propager de manière autonome", reponseB: "Un virus se propage plus rapidement qu'un ver", reponseC: "Un virus est plus dangereux qu'un ver", bonnereponse: 1 },
                        { difficulte: 2, texte: "Qu'est-ce qu'une attaque par force brute ?", reponseA: "Une méthode pour déchiffrer un mot de passe en essayant toutes les combinaisons possibles", reponseB: "Une méthode pour intercepter les données pendant leur transmission", reponseC: "Une technique pour usurper l'identité d'un utilisateur", bonnereponse: 1 },
                        { difficulte: 2, texte: "Qu'est-ce qu'un VPN (réseau privé virtuel) ?", reponseA: "Un réseau sécurisé qui permet de se connecter à distance de manière sécurisée", reponseB: "Un type de virus informatique", reponseC: "Un logiciel de gestion de projet", bonnereponse: 1 },
                        { difficulte: 2, texte: "Qu'est-ce qu'une attaque par déni de service distribué (DDoS) ?", reponseA: "Une attaque visant à rendre un service indisponible en surchargeant le serveur cible avec un grand nombre de demandes", reponseB: "Une attaque ciblant les utilisateurs finaux pour voler leurs informations personnelles", reponseC: "Une méthode pour intercepter les communications sans fil", bonnereponse: 1 },
                        { difficulte: 2, texte: "Qu'est-ce qu'un certificat SSL/TLS ?", reponseA: "Un protocole de sécurité qui garantit la confidentialité des données échangées sur Internet", reponseB: "Une autorité de certification qui vérifie l'identité des sites web", reponseC: "Un type de logiciel malveillant qui vise les serveurs web", bonnereponse: 1 },
                        { difficulte: 2, texte: "Qu'est-ce qu'une faille de sécurité zero-day ?", reponseA: "Une vulnérabilité de sécurité qui est exploitée par les attaquants avant qu'un correctif ne soit disponible", reponseB: "Une méthode d'authentification sécurisée basée sur des informations biométriques", reponseC: "Un protocole de cryptage qui garantit la confidentialité des données", bonnereponse: 1 },
                    
                        // Niveau 3 (Avancée)
                        { difficulte: 3, texte: "Qu'est-ce que l'ingénierie sociale en cybersécurité ?", reponseA: "Une technique qui exploite la manipulation psychologique pour obtenir des informations confidentielles", reponseB: "Un processus visant à concevoir des logiciels sécurisés", reponseC: "Une méthode pour intercepter les communications sans fil", bonnereponse: 1 },
                        { difficulte: 3, texte: "Qu'est-ce qu'une attaque par injection SQL ?", reponseA: "Une technique qui exploite les failles de sécurité dans les requêtes SQL pour accéder ou modifier des données non autorisées", reponseB: "Une méthode pour intercepter les communications chiffrées", reponseC: "Une forme d'attaque par déni de service", bonnereponse: 1 },
                        { difficulte: 3, texte: "Qu'est-ce qu'une attaque par ransomware ?", reponseA: "Une attaque qui chiffre les fichiers d'un système et demande une rançon pour leur déchiffrement", reponseB: "Une méthode pour voler des informations de connexion", reponseC: "Un logiciel qui bloque l'accès à un système jusqu'à ce qu'une rançon soit payée", bonnereponse: 1 },
                        { difficulte: 3, texte: "Qu'est-ce qu'un test d'intrusion en cybersécurité ?", reponseA: "Une évaluation de la sécurité d'un système informatique en simulant une attaque réelle", reponseB: "Une méthode pour sécuriser les réseaux sans fil", reponseC: "Un protocole de cryptage pour les communications en ligne", bonnereponse: 1 },
                        { difficulte: 3, texte: "Qu'est-ce qu'une attaque par sniffing ?", reponseA: "Une méthode pour intercepter et enregistrer le trafic réseau non chiffré", reponseB: "Une technique pour créer de fausses adresses IP", reponseC: "Un type d'attaque par déni de service", bonnereponse: 1 },
                        { difficulte: 3, texte: "Qu'est-ce que l'authentification à deux facteurs ?", reponseA: "Un processus qui nécessite deux méthodes d'identification distinctes pour accéder à un compte ou un système", reponseB: "Une méthode pour sécuriser les connexions réseau", reponseC: "Un protocole de chiffrement asymétrique", bonnereponse: 1 }
                    ];                    
                    
                    const stmt = db.prepare("INSERT INTO questions (difficulte, texte, reponseA, reponseB, reponseC, bonnereponse) VALUES (?, ?, ?, ?, ?, ?)");
                    questions.forEach(question => {
                        stmt.run(question.difficulte, question.texte, question.reponseA, question.reponseB, question.reponseC, question.bonnereponse);
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