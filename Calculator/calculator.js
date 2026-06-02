let calculation = localStorage.getItem('lastCalc') || '';
let result = localStorage.getItem('lastRes') || '';
let operator = false;

showCalc();
showResult();

let inputLelo = document.querySelectorAll('.buttonz');

inputLelo.forEach(button => {
    button.addEventListener('click', () => (input(button.innerHTML)));
})

function input(op) {
    if(result === 'Error') {
        calculation = '';
        result = '';
        operator = false;
    }

    if((op >= '0' && op <= '9') || op == '.') {
        calculation += op;
        
        if(operator) {
            try {
                showResult(eval(calculation));
            } catch(e) {
                if(e instanceof SyntaxError) {
                    console.log(e.message);
                    showResult('Invalid Input');
                }
            }
        }
    } else {
        if(!calculation && (op == '*' || op == '/' || op == '=')) {
            return;
        }

        operator = true;
        if(calculation[calculation.length - 1] === ' ') {
            calculation = calculation.slice(0, -2) + op + ' ';
        } else {
            calculation += ` ${op} `;
        }
    } console.log(calculation);
    
    showCalc();
}

function showCalc(ip) {
    if(ip !== undefined) {
        document.getElementById('calc').innerText = ip;
    } else {
        calculation ? document.getElementById('calc').innerText = calculation : document.getElementById('calc').innerHTML = `<br>`;
    }
}

function showResult(ip) {
    if(ip !== undefined) {
        document.getElementById('result').innerText = ip;
    } else {
        result ? document.getElementById('result').innerText = result : document.getElementById('result').innerHTML = `<br>`;
    }
}