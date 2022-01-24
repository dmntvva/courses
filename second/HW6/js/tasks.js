function getMaxEvenElement(array) {
    let even = 2;
    let newArray = array.map((elem) => {
        return Number(elem);
    }).filter((elem) => {
        return elem % even === 0;
    });
    let maxNumber = newArray.reduce((prev, curr) => {
        return Math.max(prev, curr);
    });
    return maxNumber;
}

let a = 3;
let b = 5;

let letters = {
    a: b,
    b: a
};
({ a, b } = letters)

function getValue(value) {
    const result = value ?? '-';
    return result;
}

const arrayOfArrays = [
    ['name', 'dan'],
    ['age', '21'],
    ['city', 'lviv']
];
function getObjFromArray(array) {
    let accum = {};
    array.forEach(element => {
        accum = { ...accum, [element[0]]: element[1] }
    });
    return accum;
}


const obj1 = { name: 'nick' };
function addUniqueId(obj) {
    let newObj = {};
    Object.assign(newObj, obj);
    newObj.id = Symbol();
    return newObj;
}

const oldObj = {
    name: 'willow',
    details: {
        id: 1,
        age: 47,
        university: 'LNU'
    }
}
function getRegroupedObject(obj) {
    let { name, details: { id, age, university } } = obj;
    return { university, user: { age, firstName: name, id } };
}

function getArrayWithUniqueElements(array) {
    let unique = new Set();
    array.forEach(element => {
        unique.add(element);
    });
    return unique;
}

const phoneNumber = '0123456789';
let hidenNimbers = 6;
let phoneNumberlenght = 10;
function hideNumber(phoneNumber) {
    return phoneNumber.substring(hidenNimbers).padStart(phoneNumberlenght, '*');
}

const generatorObject = generateIterableSequence();
for (let value of generatorObject) {
    console.log(value);
}

function* generateIterableSequence() {
    yield 'I';
    yield 'love';
    yield 'EPAM';
    return 'I LOVE EPAM';
}

function add(
    a = (() => { 
        throw new Error(`a is required`) 
})(),
    b = (() => { 
        throw new Error(`b is required`) 
})()
) {
    return `${a + b}`;
}
