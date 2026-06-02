let calculation = localStorage.getItem('lastCalc') || '';
let operator = false;

showCalc(); showResult();

// taking inputs
document.querySelectorAll('.buttonz')
    .forEach(button => {
        button.addEventListener('click', () => (input(button.innerHTML)));
    });

// Removed all possibilities of exceptions that could happen (according to me, will make changes if I find any other exceptions, except infinity)
// eventually found one, pressing enter after entering an operator, lol 🥀
// Ok. I found more. pressing '=' after '.' and pressing operators after '.'. I guess I have handled them too.
// Hope for no more bugs. 😭😭
// More '.' bugs...
// Fixed them... 🥀🥀

// Too much doubtful
function input(op) {
    if(op >= '0' && op <= '9') {
        calculation += op;

        if(operator) { // This enables showing result only after second operand is entered or being entered.
            try {
                showResult(eval(calculation));
            } catch {
                showResult('Error');
            }
        } else { showResult(); }
    } else if(op === '.') {
        let i = calculation.length - 1;
        while(i >= 0 && calculation[i] !== ' ') { // Handling the case with two '.'s in one operand like 9.9.8
            if(calculation[i] === '.') { return; }
            i--;
        }

        if(calculation === '' || calculation[calculation.length - 1] === ' ') { op = '0.'; } // Handling the case where only '.' is entered, which may make the expression weired like '. +'. But after handling, it is '0. + ' which is valid.
        calculation += op;

        if(operator) {
            try {
                showResult(eval(calculation));
            } catch {
                showResult('Error');
            }
        } else {
            showResult();
        }
    } else {
        if(calculation === '' && (op === '+' || op === '*' || op === '/' || op === '=')) { return; } // calculation can never start with an operand except '-'

        operator = true;
        calculation = (calculation[calculation.length - 1] === ' ' ? calculation.slice(0, -2) + op + ' ' : calculation + ` ${op} `);
    } showCalc();
}

// '=' is pressed.
document.querySelector('.equals')
    .addEventListener('click', evaluate);

// evaluates the expression: Perfect(maybe)
function evaluate() {
    if(calculation === '') { return; }

    try {
        calculation = String(eval(calculation));
    } catch {
        document.querySelector('.result').innerText = 'Error';
        return;
    }
    
    operator = false;
    localStorage.setItem('lastCalc', calculation);

    showCalc(); showResult();
}

// Clear button is pressed
document.querySelector('.clear-button')
    .addEventListener('click', khaliKaro);

// Implementing Clear: Perfect(maybe)
function khaliKaro() {
    operator = false;

    calculation = '';
    localStorage.removeItem('lastCalc');

    showCalc(); showResult();
}

// Display Calculation: Perfect(maybe)
function showCalc() {
    document.querySelector('.calc').innerHTML = (calculation !== '' ? calculation : `<br>`);
}

// Display Result: Perfect(maybe)
function showResult(res) {
    document.querySelector('.result').innerHTML = (res !== undefined ? res : `<br>`);
}