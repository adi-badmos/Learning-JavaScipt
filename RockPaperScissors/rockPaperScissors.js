let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    draws : 0
};

/* This means if the local storage has score from previous sessions, then it will be stored in score, but if not, then score will be {0, 0, 0}
Which basically looks like this

if(!score) {
    score = {
        wins: 0,
        losses: 0,
        draws: 0
    };
}
*/

const rockButton = document.querySelector('.rock');
const paperButton = document.querySelector('.paper');
const scissorNutton = document.querySelector('.scissors');
const resetButton = document.querySelector('.reset-button');
const scoreElement = document.querySelector('.score');
const autoPlayElement = document.querySelector('.auto-play-button');
const playButtons = document.querySelectorAll('.move-button');

rockButton.addEventListener('click', () => playGame(0));
paperButton.addEventListener('click', () => playGame(1));
scissorNutton.addEventListener('click', () => playGame(2));
resetButton.addEventListener('click', resetScore);
autoPlayElement.addEventListener('click', autoPlay);

updateMessage();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if(isAutoPlaying) {
        clearInterval(intervalId);
        autoPlayElement.innerText = 'Auto Play';
        isAutoPlaying = false;
        
        playButtons.forEach(playButton => {
            playButton.disabled = false;
        });
    } else {
        intervalId = setInterval(() => {
            const playerMove = getRandom();
            playGame(playerMove);
        }, 1000);

        autoPlayElement.innerText = 'Stop Play';
        isAutoPlaying = true;

        playButtons.forEach(playButton => {
            playButton.disabled = true;
        });
    }
}

function getRandom() {
    return Math.floor(Math.random() * 3);
}

function playGame(playerMove) {
    const computerMove = getRandom();

    let message = '';
    let result = '';
    if(playerMove === 0) { // player chose rock
        if(computerMove == 0) {
            message = `You chose ✊🏻. Computer chose ✊🏻.`;
            result = `That's a draw!`;
        } else if(computerMove == 1) {
            message = `You chose ✊🏻. Computer chose 🖐🏻.`;
            result = `You lost bitch!`;
        } else {
            message = `You chose ✊🏻. Computer chose ✌🏻.`;
            result = `You won!`;
        }
    } else if(playerMove === 1) { // player chose paper
        if(computerMove == 0) {
            message = `You chose 🖐🏻. Computer chose ✊🏻.`;
            result = `You won!`;
        } else if(computerMove == 1) {
            message = `You chose 🖐🏻. Computer chose 🖐🏻.`;
            result = `That's a draw!`;
        } else {
            message = `You chose 🖐🏻. Computer chose ✌🏻.`;
            result = `You lost bitch!`;
        }
    } else if(playerMove === 2) { // player chose scissors
        if(computerMove == 0) {
            message = `You chose ✌🏻. Computer chose ✊🏻.`;
            result = `You lost bitch!`;
        } else if(computerMove == 1) {
            message = `You chose ✌🏻. Computer chose 🖐🏻.`;
            result = `You won!`;
        } else {
            message = `You chose ✌🏻. Computer chose ✌🏻.`;
            result = `That's a draw!`;
        }
    }

    scoreUpdate(result);

    localStorage.setItem('score', JSON.stringify(score));

    updateMessage(message, result);
}

function scoreUpdate(result) {
    if(result === `You won!`) {
        score.wins++;
    } else if(result === `That's a draw!`) {
        score.draws++;
    } else if(result === `You lost bitch!`) {
        score.losses++;
    } else {
        alert('Nigga that is invalid result!');
    }
}

function updateMessage(message = '', result = '') {
    scoreElement.innerText = `${message}\n${result}\n\nWins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.draws}`;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.draws = 0;
    localStorage.removeItem('score');
    updateMessage();
}