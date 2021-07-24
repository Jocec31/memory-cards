// -------------------------------
// VARIABLES
// -------------------------------
const allCards = document.querySelectorAll('.carte');
const button = document.querySelector('button');
let returnedCard = false;
let primaryCard, secondCard;
let locked = false;  // pour vérouiller après 2 cartes cliquées
// -------------------------------
// FUNCTIONS
// -------------------------------

// gestion de la carte qui se retourne - dans allCards.addEventListener
function returnCard(){
    let score = 0;
    // 1 - on vérifie si le locked est à true ou pas car si à true on ne peut pas cliquer partout le temps que les cares se retournent
    if(locked) return;

    // 2 - on va cibler le this = div.carte et ses childNodes car on aura besoin du 2ème enfant node qui est la div.double-face
    //console.log(this.childNodes[1]);

    this.childNodes[1].classList.toggle('active');

    // on utilise le booleen returnedCard pour stockers les 2 cartes retournées

    // on rentre dans cette condition au premier clic pour stocker la première carte
    // on affecte la carte cliquée this à primaryCard et on sort
    if(!returnedCard){
        returnedCard = true;
        primaryCard = this;
        return
    }

    // 3 - au 2ème clic comme returnedCard sera passée à true, on ne peut plus rentre dans le if - on pour y revenir après avoir stockée la secondCard et passé retrunedCard à false de nouveau
    secondCard = this;
    returnedCard = false;
    // console.log(primaryCard, secondCard); // les affiche par paire de cards

    // 4 - une fois les cartes stockées on va vérifier leur correspondance
    verifyCardsEquality(primaryCard, secondCard);
}

// FONCTION POUR VERIFIER LA CORRESPONDACE DES CARTES PAR PAIRE
function verifyCardsEquality(primaryCard, secondCard){
    if(primaryCard.getAttribute("data-attr") === secondCard.getAttribute("data-attr")){
        primaryCard.removeEventListener('click',returnCard);
        secondCard.removeEventListener('click', returnCard);
    }else {
        locked = true;
        setTimeout(() => {
            primaryCard.childNodes[1].classList.remove('active');
            secondCard.childNodes[1].classList.remove('active');
            locked = false;
        }, 1500);
    }
  
}

// FONCTION POUR GERER LA DISTRIBUTION ALEATOIRE DES CARTES
// on va utiliser un random pour avoir un index aléatoire et le mettre en valeur à la propriété CSS order de grid - cela distribuera les cartes de façon aléatoire à chaque nouvelle partie
function aleaCards(){
    allCards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
}
// -------------------------------
// MAIN
// -------------------------------
button.addEventListener('click', () => {
    location.reload();
});

allCards.forEach(card => {
    card.addEventListener('click', returnCard); 
});

// utilisation de aleaCards() pour distribuer les cartes de façon aléatoire à chque nouvelle partie
aleaCards();
