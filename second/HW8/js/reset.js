export function reset(start, rules, heading, resultWrap, winCounter, loseCounter, buttons) {
    start.classList.remove('hidden');
    rules.classList.remove('hidden');
    heading.innerText = 'Let`s play!';
    while (resultWrap.firstChild) {
        resultWrap.removeChild(resultWrap.firstChild);
    }
    winCounter = 0;
    loseCounter = 0;
    for (const button of buttons) {
        button.disabled = false;
    }
    return { winCounter, loseCounter }
}