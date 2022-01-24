let amount;
let years;
let percentage;
let profit = 0;
let totalAmount = 0;
let minAmount = 1000;
let minYear = 1;
let minPercentage = 0;
let maxPercentage = 100;
let afterComma = 2;

function validateAmount() {
    amount = prompt('Enter the initial amount: ');
    if (!!amount && typeof Number(amount) === 'number' && amount >= minAmount) {
        return amount;
    } else {
        alert('Invalid input data');
        validateAmount();
    }
}

function validateYears() {
    years = prompt('Enter the number of years: ');
    if (!!years && typeof Number(years) === 'number' && years >= minYear) {
        return years;
    } else {
        alert('Invalid input data');
        validateYears();
    }
}

function validatePercentage() {
    percentage = prompt('Enter the percentage of a year: ');
    if (!!percentage && typeof Number(percentage) === 'number' && percentage > minPercentage &&
        percentage <= maxPercentage) {
        return percentage;
    } else {
        alert('Invalid input data');
        validatePercentage();
    }
}

function validate() {
    validateAmount();
    validateYears();
    validatePercentage();
}

function calculate() {
    let count = 0;
    totalAmount = amount;
    while (count <= years) {
        profit += totalAmount * percentage / maxPercentage;
        totalAmount = Number(amount) + profit;
        count++;
    }
}

function outputTheResult() {
    validate();
    calculate();
    console.log(` Initial amount: ${amount} \n Number of years: ${years}\n Percentage of year: ${percentage}\n
 Total profit: ${profit.toFixed(afterComma)} \n Total amount: ${totalAmount.toFixed(afterComma)} \n`);
}
outputTheResult();