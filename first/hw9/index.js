/* START TASK 1: Your code goes here */
let table = document.getElementById('table');
let tableRow = document.getElementsByTagName('tr');
let tableCells = document.getElementsByTagName('td');
table.addEventListener('click', (event) => {
    let target = event.target;
    paint(target);
});

function paint(target) {
    let row = target.parentElement;
    if (target.className === 'firstCol blue') {
        target.classList.remove('blue');
        row.classList.remove('blue');
    } else {
        if (target.className === 'firstCol') {
            target.classList.add('blue');
            row.classList.add('blue');
        }
    }
    if (target.className === 'special green') {
        target.classList.remove('green');
        table.classList.remove('green');
    } else {
        if (target.className === 'special') {
            target.classList.add('green');
            table.classList.add('green');
        }
    }
    if (target.className === 'yellow') {
        target.classList.remove('yellow');
    } else if (!target.className) {
        target.className = 'yellow';

    }
}

/* END TASK 1 */

/* START TASK 2: Your code goes here */
let input = document.getElementById('inp');
let button = document.getElementById('btn');
let form = document.getElementById('form');
let message = document.createElement('p');
input.addEventListener('input', validate);
button.addEventListener('click', (event) => {
    event.preventDefault();
    success();
});

function validate() {
    let regex = /^\+380[0-9]{9}$/;
    if (input.value) {
        if (regex.test(input.value)) {
            input.className = 'inputDefault';
            document.querySelectorAll('.error').forEach(e => e.remove());
            button.disabled = false;
        } else {
            button.disabled = true;
            input.className = 'inputError';
            errorMessage();
        }

    } else {
        document.querySelectorAll('.success').forEach(e => e.remove());
        document.querySelectorAll('.error').forEach(e => e.remove());
        input.className = 'inputDefault';
    }
}

function success() {
    document.querySelectorAll('.success').forEach(e => e.remove());
    message.className = 'success';
    message.innerText = 'Data was successfully sent';
    form.insertBefore(message, input);
}

function errorMessage() {
    document.querySelectorAll('.error').forEach(e => e.remove());
    message.className = 'error';
    message.innerText = 'Type number does not follow format +380*********';
    form.insertBefore(message, input);
}
/* END TASK 2 */

/* START TASK 3: Your code goes here */
let court = document.getElementById('wrapper');
let ball = document.getElementById('ball');
let A = document.getElementById('ringA');
let B = document.getElementById('ringB');
let teamAscore = 0,
    teamBscore = 0;
let timeout;
let scoreA = document.getElementById('scoreA');
let scoreB = document.getElementById('scoreB');
let score = document.getElementById('score');
scoreA.innerText = `Team A: ${teamAscore}`;
scoreB.innerText = `Team B: ${teamBscore}`;
court.addEventListener('click', (event) => {
    if (event.target.id === 'ringA' || event.target.id === 'ringB') {
        ball.style.left = `${event.pageX-8}px`;
        ball.style.top = `${event.pageY-385}px`;
    } else {
        ball.style.left = `${event.offsetX}px`;
        ball.style.top = `${event.offsetY}px`;
    }

});

A.addEventListener('click', () => {
    let customEventA = new CustomEvent('score', {
        detail: {
            team: 'Team A'
        }
    });
    document.dispatchEvent(customEventA);
});
B.addEventListener('click', () => {
    let customEventB = new CustomEvent('score', {
        detail: {
            team: 'Team B'
        }
    });
    document.dispatchEvent(customEventB);
});
document.addEventListener('score', (event) => { showResult(event.detail.team) });

function showResult(team) {
    if (team === 'Team A') {
        score.classList.remove('redScore');
        score.classList.add('blueScore');
        scoreA.innerText = `Team A: ${++teamAscore}`;
    } else if (team === 'Team B') {
        score.classList.remove('blueScore');
        score.classList.add('redScore');
        scoreB.innerText = `Team B: ${++teamBscore}`;
    }
    score.innerText = `${team} score!`;
    score.classList.remove('hidden');
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        score.classList.add('hidden');
    }, 3000);

}

/* END TASK 3 */