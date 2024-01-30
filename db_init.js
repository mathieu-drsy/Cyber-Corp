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
                        { difficulte: 1, texte: "Qu'est-ce qu'un pare-feu ?", reponse: "Un pare-feu est un dispositif de sécurité réseau qui surveille et contrôle le trafic entrant et sortant de votre réseau. Il permet de protéger contre les attaques en bloquant ou autorisant certains types de trafic." },
                        { difficulte: 1, texte: "Quelle est la différence entre un virus et un ver informatique ?", reponse: "Un virus est un programme informatique malveillant qui s'attache à un fichier exécutable et se propage lors de l'exécution de ce fichier, tandis qu'un ver est un programme qui se propage de manière autonome via les réseaux informatiques." },
                        { difficulte: 1, texte: "Qu'est-ce qu'une attaque de phishing ?", reponse: "Le phishing est une technique d'attaque utilisée par les cybercriminels pour tromper les utilisateurs en leur faisant croire qu'ils communiquent avec une entité légitime afin de leur soutirer des informations personnelles telles que des identifiants de connexion ou des données financières." },
                        { difficulte: 1, texte: "Quelle est l'importance de l'authentification à deux facteurs ?", reponse: "L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire en demandant aux utilisateurs de fournir deux formes d'identification pour accéder à un compte, généralement quelque chose qu'ils savent (mot de passe) et quelque chose qu'ils possèdent (comme un code envoyé par SMS)." },
                        { difficulte: 1, texte: "Quelles sont les meilleures pratiques pour créer un mot de passe sécurisé ?", reponse: "Les meilleures pratiques pour créer un mot de passe sécurisé incluent l'utilisation d'une combinaison de lettres majuscules et minuscules, de chiffres et de caractères spéciaux, ainsi que la création d'un mot de passe long et unique pour chaque compte." },
                        { difficulte: 2, texte: "Qu'est-ce qu'une attaque par déni de service (DDoS) ?", reponse: "Une attaque par déni de service (DDoS) est une attaque visant à rendre un service indisponible en surchargeant le serveur cible avec un grand nombre de demandes ou de trafic malveillant, ce qui empêche les utilisateurs légitimes d'accéder au service." },
                        { difficulte: 2, texte: "Qu'est-ce qu'une vulnérabilité de type zero-day ?", reponse: "Une vulnérabilité de type zero-day est une faille de sécurité dans un logiciel qui est exploitée par les attaquants avant que le fabricant du logiciel n'ait eu l'occasion de la corriger ou de fournir un correctif." },
                        { difficulte: 2, texte: "Quelle est la différence entre le chiffrement symétrique et asymétrique ?", reponse: "Le chiffrement symétrique utilise la même clé pour chiffrer et déchiffrer les données, tandis que le chiffrement asymétrique utilise une paire de clés distinctes : une clé publique pour chiffrer les données et une clé privée correspondante pour les déchiffrer." },
                        { difficulte: 2, texte: "Qu'est-ce qu'un certificat SSL/TLS ?", reponse: "Un certificat SSL/TLS est un fichier de données cryptographiques utilisé pour sécuriser les communications sur Internet en assurant l'authenticité et l'intégrité des données échangées entre un navigateur web et un serveur web." },
                        { difficulte: 2, texte: "Quelles sont les étapes d'une enquête en cas de violation de données ?", reponse: "Les étapes d'une enquête en cas de violation de données comprennent la détection et la confirmation de la violation, l'analyse des données affectées, la réparation des failles de sécurité, la notification des parties concernées et la mise en œuvre de mesures correctives pour prévenir de futures violations." },
                        { difficulte: 3, texte: "Qu'est-ce qu'une attaque par injection SQL ?", reponse: "Une attaque par injection SQL est une technique utilisée par les pirates informatiques pour exploiter les failles de sécurité dans les applications web en insérant du code SQL malveillant dans les champs de saisie des formulaires, ce qui peut permettre aux attaquants de manipuler la base de données sous-jacente." },
                        { difficulte: 3, texte: "Qu'est-ce qu'une attaque de type ransomware ?", reponse: "Une attaque de type ransomware est une forme d'attaque malveillante dans laquelle les pirates informatiques chiffreront les fichiers d'une victime et demanderont ensuite une rançon en échange de la clé de déchiffrement pour restaurer l'accès aux fichiers." },
                        { difficulte: 3, texte: "Quelles sont les meilleures pratiques pour sécuriser un réseau Wi-Fi domestique ?", reponse: "Les meilleures pratiques pour sécuriser un réseau Wi-Fi domestique incluent l'utilisation d'un mot de passe fort et unique pour le réseau Wi-Fi, la désactivation du SSID broadcast, l'activation du chiffrement WPA2 ou WPA3 et la mise à jour régulière du firmware du routeur." },
                        { difficulte: 3, texte: "Qu'est-ce que la cybersécurité proactive ?", reponse: "La cybersécurité proactive est une approche visant à anticiper et à prévenir les menaces potentielles en utilisant des technologies et des techniques de sécurité avancées, telles que la détection et la réponse aux incidents, la surveillance continue du réseau et l'analyse des comportements suspects." },
                        { difficulte: 3, texte: "Quelles sont les implications de la conformité RGPD pour les entreprises ?", reponse: "Le RGPD (Règlement général sur la protection des données) est une réglementation de l'Union européenne qui vise à protéger les données personnelles des individus. Les entreprises qui traitent des données personnelles doivent se conformer au RGPD en mettant en place des mesures de protection des données, en obtenant le consentement des individus pour le traitement de leurs données et en signalant les violations de données à l'autorité de protection des données compétente." }
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