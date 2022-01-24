let ask = confirm('Do you want to play a game?');
if (ask) {
    init();
} else {
    alert('You did not become a billionaire, but can.');
}

function init() {
    let prize = 100;
    let balance = 0;
    let level = 0;
    let maxRange = 4;
    let possiblePrize = prize;
    let levelUp = 2;
    let maxRangeUp = 4;
    let half = 0.5;
    let quarter = 0.25;
    let firstAttempt = 3;
    let secondAttempt = 2;
    let thirdAttempt = 1;

    function getRandom(oper2) {
        let number = Math.round(Math.random() * oper2);
        return number;
    }

    function start() {
        if (level === 0) {
            level = 1;
        } else {
            level *= levelUp;
        }
        possiblePrize = prize * level;
        maxRange += maxRangeUp;
        let number = getRandom(maxRange);
        let attempt = 3;
        while (attempt >= 0) {
            let guess;
            if (attempt > 0) {
                guess = prompt(`Choose a roulette pocket number from 0 to ${maxRange} \n
                Attempts left: ${attempt} \n
                Total prize: ${balance}$ \n
                Possible prize on current attempt: ${possiblePrize}$`);
            }
            if (Number(guess) === number) {
                success(attempt);
                attempt = 0;
                let win = confirm(`Congratulation, you won!Your prize is: ${balance}$. \n Do you want to continue?’`);
                if (win) {
                    start();
                } else {
                    alert(`Thank you for your participation. Your prize is: ${balance}$`);
                    let restart = confirm('Wanna play again?');
                    if (restart) {
                        init();
                    } else {
                        return;
                    }
                }
            } else {
                attempt--;
                fail(attempt);
            }
        }
    }

    function success(attempt) {
        switch (attempt) {
            case thirdAttempt:
                possiblePrize = level * prize * quarter;
                balance += level * prize * quarter;
                break;
            case secondAttempt:
                possiblePrize = level * prize * half;
                balance += level * prize * half;
                break;
            case firstAttempt:
                possiblePrize = level * prize;
                balance += level * prize;
                break;
            default:
                break;
        }
    }

    function fail(attempt) {
        switch (attempt) {
            case thirdAttempt:
                possiblePrize = level * prize * quarter;
                break;
            case secondAttempt:
                possiblePrize = level * prize * half;
                break;
            case firstAttempt:
                possiblePrize = level * prize;
                break;
            default:
                break;
        }
        if (attempt === 0) {
            alert(`Thank you for your participation. Your prize is: ${balance}$`);
            let restart = confirm('Wanna play again?');
            if (restart) {
                init();
            } else {
                return;
            }
        }
    }
    start();
}