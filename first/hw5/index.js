function isEquals(firstArgument, secondArgument) {
    return firstArgument === secondArgument;
}
console.log(isEquals(3, 3));

function isBigger(firstArgument, secondArgument) {
    return firstArgument > secondArgument;
}
console.log(isBigger(5, -1));

function storeNames(...name) {
    return name;
}
console.log(storeNames('sds', 'dsd', 'fssfss'));

function getDifference(firstArgument, secondArgument) {
    if (firstArgument > secondArgument) {
        return firstArgument - secondArgument;
    } else {
        return secondArgument - firstArgument;
    }
}
console.log(getDifference(5, 8));

function negativeCount(array) {
    let count = 0;
    array.forEach(element => {
        if (element < 0) {
            count++;
        }
    });
    return count;
}
console.log(negativeCount([-4, -3, 2, -9]));

function letterCount(str, letter) {
    let arr = str.toLowerCase().split(letter);
    return arr.length - 1;
}
console.log(letterCount("MaRrry", "r"));

function countPoints(results) {
    let points = 0;
    let game = [];
    results.forEach(element => {
        game = element.split(':');
        if (isEquals(+game[0], +game[1])) {
            points += 1;
        } else {
            if (isBigger(+game[0], +game[1])) {
                points += 3;
            } else return points;
        }
    })
    return points;
}
console.log(countPoints(['100:90', '110:98', '100:100', '95:46', '54:90', '99:44', '90:90', '111:100']));