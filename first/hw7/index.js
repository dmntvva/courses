let convert = 1000 * 60 * 60 * 24;

function getAge(date) {
    let today = new Date();
    let todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let birthdayInThisYear = new Date(today.getFullYear(), date.getMonth(), date.getDate());
    let age;
    if (birthdayInThisYear <= todayWithoutTime) {
        age = todayWithoutTime.getFullYear() - date.getFullYear();
    } else {
        age = todayWithoutTime.getFullYear() - date.getFullYear() - 1;
    }
    return age;
}

function getWeekDay(date) {
    const weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    let weekday = date.getDay();
    return weekDays[weekday];
}

function getAmountDaysToNewYear() {
    const today = new Date();
    const newYearDate = new Date(0, 0);
    let todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let newYear = new Date(today.getFullYear() + 1, newYearDate.getMonth(), newYearDate.getDate());
    let amountTime = (newYear.getTime() - todayWithoutTime.getTime()) / convert;
    let amountDays = Math.round(amountTime);
    return `${amountDays} days left until the New Year.`;
}

function getProgrammersDay(year) {
    let day = 255 * convert;
    let leap = 4;
    let programmersDay = new Date(day);
    let prgd = new Date(year, programmersDay.getMonth(), programmersDay.getDate());
    let months = [
        'Jan',
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
    if (year % leap == 0) {
        prgd = new Date(year, programmersDay.getMonth(), programmersDay.getDate() - 1);
    }
    return `${prgd.getDate()} ${months[prgd.getMonth()]}, ${prgd.getFullYear()} (${getWeekDay(prgd)})`
}

function howFarIs(specifiedWeekday) {
    let number;
    let date = new Date();
    let today = getWeekDay(date);
    let weekday = date.getDay();
    const weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    if (specifiedWeekday.toLowerCase() === today.toLowerCase()) {
        specifiedWeekday = today;
        number = 0;
    } else {
        for (let i = 0; i < weekDays.length; i++) {
            if (specifiedWeekday.toLowerCase() === weekDays[i].toLowerCase()) {
                specifiedWeekday = weekDays[i];
                if (i > weekday) {
                    number = i - weekday;
                } else {
                    let toEnd = weekDays.length - weekday;
                    number = i + toEnd;
                }
            }
        }
    }
    if (number == 0) {
        return `Hey, today is ${specifiedWeekday} =)`;
    } else {
        return `It's ${number} day(s) left till ${specifiedWeekday}`;
    }
}

function isValidIdentifier(string) {
    let regex = /^\D[A-Za-z0-9_$]+$/;
    return regex.test(string);
}

function capitalize(testStr) {
    let newStr = testStr.replace(/\s+[A-Za-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    return newStr;
}

function isValidAudioFile(file) {
    let fileName = file.split(/\./)[0];
    let extension = file.split(/\./)[1];
    let regexName = /^[A-Za-z]+$/;
    let regexExtension = /^mp3|flac|alac|aac$/;
    return regexName.test(fileName) && regexExtension.test(extension);
}

function getHexadecimalColors(string) {
    let regex = /(#[A-Fa-f0-9]{6})\W|(#[A-Fa-f0-9]{3})\W/g;
    let arr = string.match(regex) || [];
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/\W$/, '');
    }
    return arr;
}


function isValidPassword(password) {
    let regex = /[A-Z]+/;
    console.log(/[A-Z]+/.test(password) && /[a-z]+/.test(password) && /[0-9]+/.test(password) && /[A-Za-z0-9]{8,}/.test(password));
    return /[A-Z]+/.test(password) && /[a-z]+/.test(password) && /[0-9]+/.test(password) && /[A-Za-z0-9]{8,}/.test(password);

}

function addThousandsSeparators(number) {
    let str = String(number).split('').reverse().join('');
    let newStr = str.replace(/[0-9]{3}/g, function(el) {
        return el + ',';
    }).split('').reverse().join('');
    return newStr;
}

function getAllUrlsFromText(text) {
    try {
        let regex = new RegExp('https://([a-z]+.)+[a-z]+/', 'g');
        console.log(text.match(regex) || []);
    } catch (error) {
        console.log(error);
    }
}