'use strict';

// Starting implementation
let winnerState = document.querySelector('.winner--state');
let player0EL = document.querySelector('.player--0');
let player1EL = document.querySelector('.player--1');
let score0EL = document.querySelector('#score--0');
let score1EL = document.querySelector('#score--1');
let current0EL = document.querySelector('#current--0');
let current1EL = document.querySelector('#current--1');
let image = document.querySelector('.dice');

let activePlayer, currentScore, scores, playing;


// Starting codes
const init = function() {
    activePlayer = 0;
    currentScore = 0;
    scores = [0, 0];
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    image.classList.add('hidden')
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
    winnerState.classList.add('hidden'); 
}
init();
     

// Roll Button rolling the dice
let rollBtn = document.querySelector('.btn--roll').addEventListener('click', () => {
    if(playing) {
        let randomNumber = Math.trunc(Math.random() * 6) + 1;
        let randomImage = `imgs/dice-${randomNumber}.png`;
        image.setAttribute('src', randomImage);
        image.classList.remove('hidden');

        if (randomNumber !== 1) {
            currentScore += randomNumber;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch Player
            switchPlayer();
        }
    }
});


// Switching Player
const switchPlayer = function() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}


// Hold button
let holdBtn = document.querySelector('.btn--hold').addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            image.classList.add('hidden');
            // Showing the player winner
            winnerState.textContent = `Player ${activePlayer + 1} Wins!`;
            winnerState.classList.remove('hidden');
            playing = false;
        }

        switchPlayer();
    }
});


// Reset button reset all to 0
document.querySelector('.btn--new').addEventListener('click', init);













