const sqlite3 = require('sqlite3').verbose();

function initDb() {
    // Création d'une base de données SQLite et d'une table simple
    const db = new sqlite3.Database('save.db');
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, pseudo TEXT, score INTEGER, difficulte INTEGER, vie INTEGER, etage INTEGER, mdp TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY, difficulte INTEGER, texte TEXT, reponseA TEXT, reponseB TEXT, reponseC TEXT, bonnereponse INTEGER)");
        db.run("CREATE TABLE IF NOT EXISTS maxData (id INTEGER PRIMARY KEY, pseudo TEXT, max_score INTEGER, max_difficulte INTEGER, max_vie INTEGER, max_etage INTEGER)");
        db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                const count = row.count;
                if (count === 0) {
                    const questions = [
                        // Niveau 1 (Novice)
                            { 
                                difficulte: 1, 
                                texte: "Qu'est-ce qu'un mot de passe et pourquoi est-il important d'en avoir un solide pour ses comptes en ligne ?", 
                                reponseA: "Un code-barres pour accéder à Internet.", 
                                reponseB: "Une séquence de caractères pour protéger l'accès à un compte en ligne.", 
                                reponseC: "Un emoji utilisé pour communiquer en ligne.", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 1, 
                                texte: "Quelles caractéristiques devrait avoir un mot de passe fort ?", 
                                reponseA: "Uniquement des chiffres pour plus de simplicité.", 
                                reponseB: "Lettes majuscules et minuscules, chiffres, et caractères spéciaux.", 
                                reponseC: "Un mot facile à deviner.", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 1, 
                                texte: "Donnez un exemple de mot de passe fort.", 
                                reponseA: "123456azerty", 
                                reponseB: "S3cur!téP@ssw0rd", 
                                reponseC: "MotDePasse", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 1, 
                                texte: "Pourquoi ne devrait-on jamais partager son mot de passe avec d'autres personnes ?", 
                                reponseA: "Pour éviter de se faire voler des mots de passe.", 
                                reponseB: "Pour protéger ses informations contre les accès non autorisés.", 
                                reponseC: "Pour impressionner ses amis.", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 1, 
                                texte: "Comment pouvez-vous vous assurer que votre mot de passe reste confidentiel ?", 
                                reponseA: "En l'écrivant sur un post-it.", 
                                reponseB: "En ne le partageant jamais, en le changeant régulièrement et en utilisant des méthodes de stockage sécurisées.", 
                                reponseC: "En le criant à voix haute régulièrement.", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 1, 
                                texte: "Quelles sont les conséquences potentielles d'un mot de passe faible ou facile à deviner ?", 
                                reponseA: "Aucune conséquence.", 
                                reponseB: "Accès non autorisé, vol d'identité, et perte de données sensibles.", 
                                reponseC: "Plus de sécurité.", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 1, 
                                texte: "Pourquoi est-il recommandé d'utiliser des phrases de passe plutôt que des mots simples ?", 
                                reponseA: "Les phrases de passe sont plus courtes.", 
                                reponseB: "Les phrases de passe sont généralement plus longues et plus difficiles à deviner.", 
                                reponseC: "Les phrases de passe sont moins sécurisées.", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 1, 
                                texte: "Comment pouvez-vous vous rappeler de plusieurs mots de passe en toute sécurité ?", 
                                reponseA: "Les écrire sur un document sur votre bureau.", 
                                reponseB: "Utiliser des gestionnaires de mots de passe sécurisés.", 
                                reponseC: "Utiliser le même mot de passe pour tous les comptes.", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 1, 
                                texte: "Pourquoi est-il important de se déconnecter après avoir utilisé un compte en ligne sur un ordinateur partagé ?", 
                                reponseA: "Pour économiser de l'énergie.", 
                                reponseB: "Pour protéger vos informations personnelles contre l'accès non autorisé.", 
                                reponseC: "Pour éviter les notifications ennuyeuses.", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 1, 
                                texte: "Que devez-vous faire si vous suspectez que votre compte a été compromis ?", 
                                reponseA: "Ignorer la situation.", 
                                reponseB: "Changez immédiatement le mot de passe du compte, activez la vérification en deux étapes si possibles, et contactez le support de sécurité de la plateforme.", 
                                reponseC: "Poster vos informations de compte sur les réseaux sociaux pour obtenir de l'aide.", 
                                bonnereponse: 2 
                            },
                            // Niveau 2 (Intermédiaire)
                            { 
                                difficulte: 2, 
                                texte: "Que signifie l'acronyme 'ACL' dans le contexte des firewalls ?", 
                                reponseA: "Adaptive Control Layer", 
                                reponseB: "Access Control List", 
                                reponseC: "Advanced Configuration Language", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Quelle est la principale différence entre un pare-feu de nouvelle génération (NGFW) et un pare-feu traditionnel ?", 
                                reponseA: "La couleur de l'interface utilisateur", 
                                reponseB: "Le coût", 
                                reponseC: "L’ajout de fonctionnalités de sécurité avancées comme la détection d'intrusion", 
                                bonnereponse: 3 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Qu'est-ce qu'une 'règle de pare-feu' ?", 
                                reponseA: "Une ligne directrice pour la gestion des employés", 
                                reponseB: "Un ensemble d'instructions qui détermine le trafic autorisé ou bloqué", 
                                reponseC: "Une directive gouvernementale sur la cybersécurité", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Qu'est-ce que la 'stateful inspection' dans le contexte des firewalls ?", 
                                reponseA: "L'analyse des journaux de pare-feu", 
                                reponseB: "La surveillance en temps réel de l'état des connexions réseau", 
                                reponseC: "La vérification des paramètres de sécurité du réseau", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Qu'est-ce que la 'DMZ' dans le contexte d'un pare-feu ?", 
                                reponseA: "Dangerous Monitoring Zone", 
                                reponseB: "Data Management Zone", 
                                reponseC: "De-Militarized Zone", 
                                bonnereponse: 3 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Comment un pare-feu 'proxy' fonctionne-t-il ?", 
                                reponseA: "Il bloque toutes les connexions entrantes et sortantes", 
                                reponseB: "Il sert d'intermédiaire entre les utilisateurs et les ressources Internet", 
                                reponseC: "Il analyse uniquement le trafic sortant", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Qu'est-ce qu'une 'attaque par déni de service' (DDoS) et comment un pare-feu peut-il aider à atténuer ces attaques ?", 
                                reponseA: "Une attaque visant à bloquer l'accès aux données, et un pare-feu peut filtrer le trafic pour détecter et bloquer ces attaques", 
                                reponseB: "Une attaque qui force l'accès non autorisé aux données, et un pare-feu peut crypter les données pour les protéger", 
                                reponseC: "Une attaque visant à voler des informations, et un pare-feu peut détecter les logiciels malveillants associés", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Quelle est la différence entre un pare-feu matériel et un pare-feu logiciel ?", 
                                reponseA: "Le prix", 
                                reponseB: "L'emplacement d'installation (physique vs logiciel)", 
                                reponseC: "Les fonctionnalités de sécurité offertes", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Qu'est-ce que la 'deep packet inspection' (DPI) dans le contexte des firewalls ?", 
                                reponseA: "L'analyse détaillée du trafic réseau, y compris le contenu des paquets", 
                                reponseB: "La suppression des paquets non conformes", 
                                reponseC: "La désactivation temporaire des connexions réseau", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Comment un pare-feu peut-il contribuer à la protection des applications Web ?", 
                                reponseA: "En bloquant l'accès à toutes les applications Web", 
                                reponseB: "En surveillant et filtrant le trafic HTTP/HTTPS pour détecter et prévenir les attaques", 
                                reponseC: "En autorisant toutes les connexions entrantes et sortantes", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Que signifie le terme 'SSL' en cybersécurité ?", 
                                reponseA: "Super Secure Layer", 
                                reponseB: "Secure Socket Layer", 
                                reponseC: "Safe System Link", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Quelle est la fonction principale d'un 'honeypot' dans le domaine de la cybersécurité ?", 
                                reponseA: "Détecter les attaques et les bloquer", 
                                reponseB: "Attirer les attaquants pour les surveiller", 
                                reponseC: "Protéger les serveurs contre les logiciels malveillants", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Que représente l'acronyme 'DMZ' dans un contexte réseau ?", 
                                reponseA: "Data Management Zone", 
                                reponseB: "De-Militarized Zone", 
                                reponseC: "Digital Monitoring Zone", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Qu'est-ce qu'une 'attaque de force brute' en cybersécurité ?", 
                                reponseA: "Une attaque rapide et furtive", 
                                reponseB: "Une attaque qui exploite une vulnérabilité logicielle", 
                                reponseC: "Une tentative systématique de deviner un mot de passe en essayant différentes combinaisons", 
                                bonnereponse: 3 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Qu'est-ce que le terme 'Zero-day' signifie dans le domaine de la sécurité informatique ?", 
                                reponseA: "Une menace qui survient tous les zéros jours", 
                                reponseB: "Une vulnérabilité de logiciel non corrigée", 
                                reponseC: "Une stratégie de protection contre les attaques", 
                                bonnereponse: 2 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Que désigne le concept de 'Phishing' ?", 
                                reponseA: "La pêche à la mouche", 
                                reponseB: "La suppression de fichiers inutiles sur un système", 
                                reponseC: "Une tentative de tromper les utilisateurs pour obtenir des informations sensibles", 
                                bonnereponse: 3 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Qu'est-ce qu'un 'VPN' en cybersécurité ?", 
                                reponseA: "Virtual Private Network", 
                                reponseB: "Very Powerful Network", 
                                reponseC: "Virus Protection Node", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Quelle est la principale caractéristique d'un 'sandbox' en sécurité informatique ?", 
                                reponseA: "Un environnement isolé pour tester les fichiers suspects", 
                                reponseB: "Un système de stockage sécurisé", 
                                reponseC: "Un pare-feu avancé", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Que signifie l'acronyme 'IoT' en sécurité informatique ?", 
                                reponseA: "Internet of Things", 
                                reponseB: "Input Output Technology", 
                                reponseC: "Information on Threats", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 2, 
                                texte: "Qu'est-ce qu'une 'CVE' dans le contexte de la cybersécurité ?", 
                                reponseA: "Cyber Vulnerability Encryption", 
                                reponseB: "Common Vulnerabilities and Exposures", 
                                reponseC: "Cryptographic Verification Element", 
                                bonnereponse: 2 
                            },
                            // Niveau 3 (Avancé)
                            { 
                                difficulte: 3, 
                                texte: "Qu'est-ce que l'attaque 'Man-in-the-Middle' (MITM) et comment peut-elle être évitée ?", 
                                reponseA: "Une attaque où un attaquant intercepte et modifie les communications entre deux parties. Elle peut être évitée en utilisant des connexions chiffrées et en vérifiant les certificats SSL/TLS.", 
                                reponseB: "Une attaque qui cible les utilisateurs en leur envoyant de fausses informations. Elle peut être évitée en mettant à jour régulièrement les logiciels et en utilisant des pare-feu efficaces.", 
                                reponseC: "Une attaque qui infecte les périphériques avec un logiciel malveillant. Elle peut être évitée en utilisant des antivirus et des outils de détection des logiciels malveillants.", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 3, 
                                texte: "Qu'est-ce que la 'cryptographie quantique' et en quoi diffère-t-elle de la cryptographie classique ?", 
                                reponseA: "La cryptographie quantique utilise des bits quantiques pour sécuriser les communications, offrant une sécurité inconditionnelle. Elle diffère de la cryptographie classique en raison de ses principes fondamentalement différents basés sur la physique quantique.", 
                                reponseB: "La cryptographie quantique utilise des algorithmes classiques pour chiffrer les données, offrant une sécurité renforcée. Elle diffère de la cryptographie classique par l'utilisation de clés publiques et privées.", 
                                reponseC: "La cryptographie quantique utilise des calculs intensifs pour chiffrer les données, offrant une sécurité accrue. Elle diffère de la cryptographie classique en raison de sa compatibilité avec les réseaux informatiques.", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 3, 
                                texte: "Quels sont les principaux défis liés à la protection de la confidentialité dans l'ère du Big Data et de l'Internet des objets (IoT) ?", 
                                reponseA: "La collecte massive de données et la variété des appareils connectés rendent difficile le contrôle de l'accès aux informations personnelles. Les principaux défis incluent la sécurisation des données sur les appareils IoT et la protection contre les fuites de données massives.", 
                                reponseB: "L'augmentation du volume de données et la complexité des réseaux rendent difficile la gestion des politiques de confidentialité. Les principaux défis incluent la sécurisation des données sur les réseaux sociaux et la protection contre les attaques de phishing.", 
                                reponseC: "La diversité des sources de données et la prolifération des cybermenaces rendent difficile la détection des violations de données. Les principaux défis incluent la sécurisation des données sur les appareils mobiles et la protection contre les attaques par déni de service.", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 3, 
                                texte: "Qu'est-ce qu'une 'attaque par injection SQL' et comment peut-elle être prévenue ?", 
                                reponseA: "Une attaque qui exploite les vulnérabilités des bases de données pour exécuter des commandes SQL non autorisées. Elle peut être prévenue en utilisant des requêtes préparées et en appliquant des pratiques de sécurisation des données.", 
                                reponseB: "Une attaque qui cible les serveurs de messagerie pour voler des informations sensibles. Elle peut être prévenue en utilisant des pare-feu applicatifs et en filtrant les e-mails malveillants.", 
                                reponseC: "Une attaque qui vise à infecter les serveurs Web avec des logiciels malveillants. Elle peut être prévenue en utilisant des antivirus et en mettant à jour régulièrement les logiciels.", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 3, 
                                texte: "Qu'est-ce qu'une 'attaque par canal auxiliaire' (side channel attack) et comment peut-elle être atténuée ?", 
                                reponseA: "Une attaque qui exploite les canaux de communication indirects pour obtenir des informations sensibles. Elle peut être atténuée en mettant en œuvre des contre-mesures telles que le masquage de la consommation d'énergie et le brouillage du temps de réponse.", 
                                reponseB: "Une attaque qui utilise des canaux de communication parallèles pour transmettre des données. Elle peut être atténuée en utilisant des pare-feu réseau et en surveillant le trafic.", 
                                reponseC: "Une attaque qui cible les canaux de communication sécurisés pour intercepter des données. Elle peut être atténuée en utilisant le chiffrement de bout en bout et en protégeant les clés de chiffrement.", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 3, 
                                texte: "Qu'est-ce que l'authentification à deux facteurs (2FA) et en quoi est-elle plus sécurisée que l'authentification par mot de passe seul ?", 
                                reponseA: "L'authentification à deux facteurs utilise deux méthodes différentes pour vérifier l'identité d'un utilisateur, ce qui la rend plus difficile à pirater que l'authentification par mot de passe seul. Elle peut impliquer l'utilisation d'un code temporaire envoyé par SMS ou généré par une application d'authentification.", 
                                reponseB: "L'authentification à deux facteurs utilise deux mots de passe différents pour accéder à un compte, ce qui la rend plus sécurisée que l'authentification par mot de passe seul. Elle peut impliquer l'utilisation de questions de sécurité personnalisées et de réponses.", 
                                reponseC: "L'authentification à deux facteurs utilise deux niveaux d'autorisation pour accéder à un compte, ce qui la rend plus fiable que l'authentification par mot de passe seul. Elle peut impliquer l'utilisation de certificats numériques et de clés RSA.", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 3, 
                                texte: "Qu'est-ce qu'une 'attaque de déni de service distribué' (DDoS) et comment peut-elle être atténuée ?", 
                                reponseA: "Une attaque qui vise à rendre un service indisponible en submergeant le serveur cible de trafic malveillant. Elle peut être atténuée en utilisant des services de protection DDoS, des pare-feu et des serveurs à tolérance de panne.", 
                                reponseB: "Une attaque qui cible les routeurs pour détourner le trafic Internet. Elle peut être atténuée en utilisant des protocoles de routage sécurisés et en surveillant le trafic réseau.", 
                                reponseC: "Une attaque qui exploite les vulnérabilités des applications Web pour voler des informations sensibles. Elle peut être atténuée en utilisant des pare-feu applicatifs et en filtrant les requêtes malveillantes.", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 3, 
                                texte: "Qu'est-ce qu'une 'attaque par phishing ciblé' et comment peut-elle être détectée ?", 
                                reponseA: "Une attaque qui vise spécifiquement des individus ou des organisations avec des e-mails frauduleux. Elle peut être détectée en utilisant des solutions de détection des e-mails malveillants et en formant les utilisateurs à reconnaître les tentatives de phishing.", 
                                reponseB: "Une attaque qui utilise des logiciels malveillants pour voler des informations sensibles. Elle peut être détectée en utilisant des antivirus et des logiciels anti-spyware.", 
                                reponseC: "Une attaque qui exploite les vulnérabilités des serveurs Web pour accéder à des données sensibles. Elle peut être détectée en utilisant des outils de test de vulnérabilité et en mettant à jour régulièrement les logiciels.", 
                                bonnereponse: 1 
                            },
                            { 
                                difficulte: 3, 
                                texte: "Qu'est-ce que le 'bug bounty' et comment fonctionne-t-il ?", 
                                reponseA: "Le bug bounty est un programme de récompenses pour les chercheurs en sécurité qui découvrent et signalent des vulnérabilités logicielles. Les entreprises offrent des primes en échange de rapports détaillés sur les failles de sécurité.", 
                                reponseB: "Le bug bounty est une technique de piratage qui utilise des bogues logiciels pour accéder à des systèmes non autorisés. Les entreprises paient des pirates informatiques pour obtenir des informations sur les vulnérabilités de leurs systèmes.", 
                                reponseC: "Le bug bounty est une stratégie de marketing qui vise à attirer l'attention sur les nouvelles versions de logiciels. Les entreprises offrent des récompenses aux clients qui signalent des bogues dans leurs produits.", 
                                bonnereponse: 1 
                            },
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