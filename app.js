console.log('appjs is active');

let scores;
let roundScore;
let activePlayer;
let lastDice;
let gamePlaying;

init();

function generateRandomNumber() {
    // range 1 -6
    return Math.floor(Math.random() * 6) + 1;
}

function displayDiceNumber(number) {
    let domDice = document.querySelector('.dice');
    domDice.style.display = 'block';
    domDice.src = './assets/img/dice-' + number + '.png';
}

function checkTheDiceNumber(dice) {
    // update if the player 2x get dice number 6, score will 0 again.
    if (dice === 6 && lastDice === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        changePlayer();
    } else if (dice === 1) {
        changePlayer();
    } else {
        roundScore = roundScore + dice;
        document.querySelector('#current-' + activePlayer).textContent =
            roundScore;
    }
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        let dice = generateRandomNumber();

        displayDiceNumber(dice);

        checkTheDiceNumber(dice);

        lastDice = dice;
    }
});

function updateScorePlayer() {
    document.querySelector('#score-' + activePlayer).textContent =
        scores[activePlayer];
}

function checkIfPlayerWin() {
    if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document
            .querySelector('.player-' + activePlayer + '-panel')
            .classList.add('winner');
        document
            .querySelector('.player-' + activePlayer + '-panel')
            .classList.remove('active');
        gamePlaying = false;
    } else {
        //change player
        changePlayer();
    }
}

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add curent score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        updateScorePlayer();

        //check if the player won the game
        checkIfPlayerWin();
    }
});

function changePlayer() {
    roundScore = 0;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
