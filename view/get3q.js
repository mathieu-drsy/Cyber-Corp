// Fonction pour récupérer les questions depuis le serveur
function getQuestions(difficulty) {
    fetch(`/get-questions?difficulty=${difficulty}`)
        .then(response => response.json())
        .then(questions => {
            // Une fois les questions récupérées, appeler la fonction displayQuestions
            displayQuestions(questions);
        })
        .catch(error => console.error('Une erreur s\'est produite lors de la récupération des questions :', error));
}

// Fonction pour afficher les questions sur la page
function displayQuestions(questions) {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = ''; // Efface le contenu précédent

    // Fonction pour mélanger un tableau aléatoirement
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Parcourt les questions et les ajoute à la liste
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionTitle = document.createElement('h2');
        questionTitle.textContent = question.texte;

        const answerList = document.createElement('ol');
        answerList.type = "a"; // Définir le type de la liste comme "a"

        // Tableau des réponses et de leurs clés associées
        const answersMap = [
            { key: 'reponseA', text: question.reponseA },
            { key: 'reponseB', text: question.reponseB },
            { key: 'reponseC', text: question.reponseC }
        ];

        // Enregistrer l'index de la bonne réponse
        const correctIndex = question.bonnereponse - 1;

        // Ajouter chaque réponse à la liste
        answersMap.forEach(answer => {
            const answerItem = document.createElement('li');
            answerItem.textContent = answer.text;
            answerList.appendChild(answerItem);
        });

        // Marquer la bonne réponse
        const correctAnswerItem = answerList.children[correctIndex];
        correctAnswerItem.classList.add('correct-answer');

        // Mélanger les réponses (après avoir marqué la bonne réponse)
        const answers = Array.from(answerList.children);
        shuffle(answers);
        answerList.innerHTML = ''; // Efface les éléments existants
        answers.forEach(answer => {
            answerList.appendChild(answer);
        });

        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(answerList);

        questionsList.appendChild(questionDiv);
    });
}