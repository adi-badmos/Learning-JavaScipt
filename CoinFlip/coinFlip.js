let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0
};

showResult();

function guess() {
    return Math.floor(Math.random() * 2);
}

document.querySelector('.heads').addEventListener('click', () => {
    playGame(0);
});

document.querySelector('.tails').addEventListener('click', () => {
    playGame(1);
});

document.querySelector('.clear-button').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    localStorage.setItem('score', JSON.stringify(score));
    showResult();
});

function playGame(userGuess) {
    let computerGuess = guess();

    let message = '';
    let result = '';

    let map = {
        0: 'heads',
        1: 'tails'
    }

    if(computerGuess === userGuess) {
        score.wins++;
        result = 'You won!';
    } else {
        score.losses++;
        result = 'You lost bitch!';
    }

    message = `You chose ${map[userGuess]}. Computer chose ${map[computerGuess]}.`

    localStorage.setItem('score', JSON.stringify(score));

    showResult(message, result);
}

function showResult(message = '', result = '') {
    document.querySelector(".result").innerText = `${message}\n${result}\nWins: ${score.wins}, Losses: ${score.losses}`;
}