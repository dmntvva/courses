import '../scss/style.scss';
import {
    generateItem
} from './bot.js';
import {
    reset
} from './reset.js'
let start = document.getElementById('start');
let resultWrap = document.getElementById('results');
let heading = document.getElementById('start_heading');
let rules = document.getElementById('start_rules');
let buttons = document.getElementsByClassName('game-item');
let winCounter = 0;
let loseCounter = 0;
document.getElementById('buttons'), addEventListener('click', (event) => {
    let target = event.target;
    let enemyChoise;
    let maxCountAttempt = 3;
    let count = document.getElementsByClassName('round');
    if (target.className === 'reset') {
        let resetResult = reset(start, rules, heading, resultWrap, winCounter, loseCounter, buttons);
        winCounter = resetResult.winCounter;
        loseCounter = resetResult.loseCounter;
    }
    if (target.className.includes('game-item')) {
        start.classList.add('hidden');
        enemyChoise = generateItem();
        console.log(enemyChoise);
        if (target.className.includes('rock')) {
            let myChoise = 'rock';
            if (enemyChoise === 'rock') {
                let roundRes = document.createElement('p');
                roundRes.className = 'round';
                roundRes.innerText = `Round ${count.length + 1}, ${
                    enemyChoise.toUpperCase()} vs. ${
                        myChoise.toUpperCase()}, Draw!`;
                resultWrap.append(roundRes);
            } else if (enemyChoise === 'paper') {
                let roundRes = document.createElement('p');
                roundRes.className = 'round';
                roundRes.innerText = `Round ${count.length + 1}, ${
                    enemyChoise.toUpperCase()} vs. ${
                        myChoise.toUpperCase()}, You've LOST!`;
                resultWrap.append(roundRes);
                loseCounter++;
            } else if (enemyChoise === 'scissors') {
                let roundRes = document.createElement('p');
                roundRes.className = 'round';
                roundRes.innerText = `Round ${count.length + 1}, ${
                    enemyChoise.toUpperCase()} vs. ${
                        myChoise.toUpperCase()}, You've WON!`;
                resultWrap.append(roundRes);
                winCounter++;
            }
        } else if (target.className.includes('paper')) {
            let myChoise = 'paper';
            if (enemyChoise === 'rock') {
                let roundRes = document.createElement('p');
                roundRes.className = 'round';
                roundRes.innerText = `Round ${count.length + 1}, ${
                    enemyChoise.toUpperCase()} vs. ${
                        myChoise.toUpperCase()}, You've WON!`;
                resultWrap.append(roundRes);
                winCounter++;
            } else if (enemyChoise === 'paper') {
                let roundRes = document.createElement('p');
                roundRes.className = 'round';
                roundRes.innerText = `Round ${count.length + 1}, ${
                    enemyChoise.toUpperCase()} vs. ${
                        myChoise.toUpperCase()}, Draw!`;
                resultWrap.append(roundRes);
            } else if (enemyChoise === 'scissors') {
                let roundRes = document.createElement('p');
                roundRes.className = 'round';
                roundRes.innerText = `Round ${count.length + 1}, ${
                    enemyChoise.toUpperCase()} vs. ${
                        myChoise.toUpperCase()}, You've LOST!`;
                resultWrap.append(roundRes);
                loseCounter++;
            }
        } else if (target.className.includes('scissors')) {
            let myChoise = 'scissors';
            if (enemyChoise === 'rock') {
                let roundRes = document.createElement('p');
                roundRes.className = 'round';
                roundRes.innerText = `Round ${count.length + 1}, ${
                    enemyChoise.toUpperCase()} vs. ${
                        myChoise.toUpperCase()}, You've LOST!`;
                resultWrap.append(roundRes);
                loseCounter++;
            } else if (enemyChoise === 'paper') {
                let roundRes = document.createElement('p');
                roundRes.className = 'round';
                roundRes.innerText = `Round ${count.length + 1}, ${
                    enemyChoise.toUpperCase()} vs. ${
                        myChoise.toUpperCase()}, You've WON!`;
                resultWrap.append(roundRes);
                winCounter++;
            } else if (enemyChoise === 'scissors') {
                let roundRes = document.createElement('p');
                roundRes.className = 'round';
                roundRes.innerText = `Round ${count.length + 1}, ${
                    enemyChoise.toUpperCase()} vs. ${
                        myChoise.toUpperCase()}, Draw!`;
                resultWrap.append(roundRes);
            }
        }
        if (winCounter === maxCountAttempt) {
            heading.innerText = 'YOU WON!';
            rules.classList.add('hidden');
            start.classList.remove('hidden');
            for (const button of buttons) {
                button.disabled = true;
            }
        } else if (loseCounter === maxCountAttempt) {
            heading.innerText = 'YOU LOST!';
            rules.classList.add('hidden');
            start.classList.remove('hidden');
            for (const button of buttons) {
                button.disabled = true;
            }
        }
    }
});
