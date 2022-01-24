function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function generateItem() {
    let arrayOfSigns = [
        'rock',
        'paper',
        'scissors'
    ];
    let element = arrayOfSigns[getRandom(0, arrayOfSigns.length - 1)];
    return element;
}