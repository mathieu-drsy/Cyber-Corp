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
    questionsList.innerHTML = ''; // Effacer le contenu précédent

    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionTitle = document.createElement('h2');
        questionTitle.textContent = question.texte;

        const questionAnswer = document.createElement('p');
        questionAnswer.textContent = question.reponse;

        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(questionAnswer);

        questionsList.appendChild(questionDiv);
    });
}