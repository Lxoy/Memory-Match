const cards = document.querySelectorAll('.card');

let player1turn = true;
let player1 = 0, player2 = 0;

let flipedCard = false;
let firstCard = null, secondCard = null;
let lockBoard = false; // To prevent flipping more than two cards at once

function flipCard() {
    if (lockBoard || this === firstCard) return; // Prevent double-click or flipping more than two cards

    this.classList.add('flip');

    if (!flipedCard) {
        // First card clicked
        flipedCard = true;
        firstCard = this;
    } else {
        // Second card clicked
        flipedCard = false;
        secondCard = this;

        // Check if the two cards match
        checkForMatch();
    }
}

function checkForMatch() {
    // Compare based on a data attribute (e.g., data-image) or image source
    let isMatch = firstCard.querySelector('.front-card').src === secondCard.querySelector('.front-card').src;

    if (isMatch) {
        // Cards match
        if(player1turn){
            player1++;
        }
        else{
            player2++;
        }
        disableCards();
        updateScore();
        
    } else {
        // Cards don't match
        player1turn = !player1turn;
        unflipCards();
        updateTurn();
    }
}

function updateScore(){
    if(player1turn){
        document.getElementById("player1").innerHTML = "PLAYER 1: " + player1;
    }
    else{
        document.getElementById("player2").innerHTML = "PLAYER 2: " + player2;
    }
}

function updateTurn(){
    if(player1turn){
        document.getElementById("playerturn").innerHTML = "PLAYER 1 TURN";
    }
    else{
        document.getElementById("playerturn").innerHTML = "PLAYER 2 TURN";
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true; // Lock the board to prevent clicking more cards

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 750);
}

function resetBoard() {
    [flipedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomNumber = Math.floor(Math.random() * 16);
        card.style.order = randomNumber;
    })
})();



cards.forEach(card => card.addEventListener('click', flipCard));
