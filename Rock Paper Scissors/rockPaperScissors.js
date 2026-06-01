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

updateMessage();

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
    document.querySelector('.score').innerText = `${message}\n${result}\n\nWins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.draws}`;
}