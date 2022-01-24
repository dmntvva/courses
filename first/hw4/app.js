function reverseNumber(num) {
    let numb = num + '';
    let newNumber = '';
    if (numb[0] === '-') {
        for (let i = numb.length - 1; i > 0; i--) {
            newNumber += numb[i];
        }
        return newNumber * -1;
    } else {
        for (let i = numb.length - 1; i >= 0; i--) {
            newNumber += numb[i];
        }
        return +newNumber;
    }
}
reverseNumber(-123450);

function forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}
forEach([2, 5, 8], function(el) {
    console.log(el);
});

function map(arr, func) {
    let newArray = [];
    forEach(arr, function(el) {
        newArray.push(func(el));
    });
    return newArray;
}
map([2, 5, 8], function(el) {
    return el + 3;
});
map([1, 2, 3, 4, 5], function(el) {
    return el * 2;
});

function filter(arr, func) {
    let newArray = [];
    forEach(arr, function(el) {
        if (func(el)) {
            newArray.push(el);
        }
    });
    return newArray;
}
filter([2, 5, 1, 3, 8, 6], function(el) {
    return el > 3;
});
filter([1, 4, 6, 7, 8, 10], function(el) {
    return el % 2 === 0;
});

function getAdultAppleLovers(data) {
    let personObj = filter(data, function(el) {
        return el.favoriteFruit === 'apple' && el.age > 18;
    })
    map(personObj, function(el) {
        return el.name;
    });
}
getAdultAppleLovers(data);

function getKeys(obj) {
    let arrayOfKeys = [];
    for (const key in obj) {
        arrayOfKeys.push(key);
    }
    return arrayOfKeys;
}

getKeys({
    keyOne: 1,
    keyTwo: 2,
    KeyThree: 3
});

function getValues(obj) {
    let arrayOfValues = [];
    for (const key in obj) {
        arrayOfValues.push(obj[key]);
    }
    return arrayOfValues;
}
getValues({
    keyOne: 1,
    keyTwo: 2,
    KeyThree: 3
});

function showFormattedDate(dateObj) {
    let month = ['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    return `It is ${dateObj.getDate()} of ${month[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
}
showFormattedDate(new Date('2018-08-27T01:10:00'));