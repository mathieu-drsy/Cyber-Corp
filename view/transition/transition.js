function generateNumber() {
    const numero = document.createElement('div');
    numero.className = 'numero';
    numero.textContent = Math.round(Math.random()) ? '1' : '0';
    numero.style.position = 'absolute';
    numero.style.left = Math.random() * window.innerWidth + 'px';
    numero.style.top = Math.random() * window.innerHeight + 'px';

    document.querySelector('.fond-numerique').appendChild(numero);

    setTimeout(() => {
        numero.remove();
    }, 5000); // Changez la durée ici si nécessaire
}

setInterval(generateNumber, 100);
