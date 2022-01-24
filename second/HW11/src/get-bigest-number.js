module.exports = { getBigestNumber };
function getBigestNumber(...arg) {
    let max = arg[0];
    if (arg.length < 2) {
        throw new Error('Not enough arguments');
    }
    if (arg.length > 10) {
        throw new Error('Too many arguments');
    }
    arg.forEach(element => {
        if (typeof element !== 'number') {
            throw new Error('Wrong argument type');
        }
    });
    arg.forEach((elem) => {
        if (elem > max) {
            max = elem;
        }
    })
    return max;
}