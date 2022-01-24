const appRoot = document.getElementById('app-root');
const reg = externalService.getRegionsList();
const lng = externalService.getLanguagesList();
const theadName = [
    'Country name',
    'Capital',
    'World region',
    'Languages',
    'Area',
    'Flag'
];
const keyNames = [
    'name',
    'capital',
    'region',
    'languages',
    'area',
    'flagURL'
];
let list;
let form = document.createElement('form');
let title = document.createElement('h1');
let typeOfSearch = document.createElement('p');
let rRegion = document.createElement('div');
let rLanguage = document.createElement('div');
let radio = document.createElement('div');
let radioWrap = document.createElement('div');
let radioBtnRegion = document.createElement('input');
let radioBtnLanguage = document.createElement('input');
let labelForRegion = document.createElement('label');
let labelForLanguage = document.createElement('label');
let labelForQuery = document.createElement('label'); //
let dropdown = document.createElement('select'); //
let optionEmpty = document.createElement('option');
let emptyTableText = document.createElement('p');
let arrowName = document.createElement('span');
let arrowArea = document.createElement('span');
let table;
let flag;
rRegion.addEventListener('click', changeTypeToRegion);
rLanguage.addEventListener('click', changeTypeToLanguage);
dropdown.addEventListener('change',
    (event) => {
        createTable(event.target);
    }
);
emptyTableText.innerText = 'No items, please choose search query';
labelForQuery.htmlFor = 'dropdown';
labelForQuery.innerText = 'Please choose search query: '
labelForRegion.htmlFor = 'radioBtnRegion';
labelForRegion.innerText = 'By Region';
labelForLanguage.htmlFor = 'radioBtnLanguage';
labelForLanguage.innerText = 'By Language';
dropdown.disabled = true;
optionEmpty.innerText = 'Select value';
optionEmpty.value = 'Select value';
typeOfSearch.innerText = 'Please choose type of search: ';
radioBtnRegion.id = 'radioBtnRegion';
radioBtnLanguage.id = 'radioBtnLanguage';
radioBtnLanguage.name = 'radioBtn';
radioBtnRegion.name = 'radioBtn';
radioBtnRegion.type = 'radio';
radioBtnLanguage.type = 'radio';
radio.className = 'rd';
radioWrap.className = 'radioWrap';
title.innerText = 'Countries Search';
title.className = 'title';
emptyTableText.className = 'hidden';
appRoot.append(form);
form.append(title, radioWrap, labelForQuery, dropdown);
radioWrap.append(typeOfSearch, radio);
radio.append(rRegion, rLanguage);
rRegion.append(radioBtnRegion, labelForRegion);
rLanguage.append(radioBtnLanguage, labelForLanguage);
dropdown.append(optionEmpty);
appRoot.append(emptyTableText);

function changeTypeToRegion() {
    flag = true;
    clear('.languages');
    clear('.regions');
    clear('.table');
    emptyTableText.classList.remove('hidden');
    dropdown.disabled = false;
    let optionsArray = [];
    for (const key in reg) {
        let option = document.createElement('option');
        option.className = 'regions';
        if (Object.hasOwnProperty.call(reg, key)) {
            optionsArray.push(option);
            option.innerText = reg[key];
            option.value = reg[key];
        }
    }
    dropdown.append(...optionsArray);
}

function changeTypeToLanguage() {
    flag = false;
    clear('.languages');
    clear('.regions');
    clear('.table');
    emptyTableText.classList.remove('hidden');
    dropdown.disabled = false;
    let languagesArray = [];
    for (const key in lng) {
        let languages = document.createElement('option');
        languages.className = 'languages';
        if (Object.hasOwnProperty.call(lng, key)) {
            languagesArray.push(languages);
            languages.innerText = lng[key];
            languages.value = lng[key];
        }
    }
    dropdown.append(...languagesArray);
}

function clear(className) {
    let option = document.querySelectorAll(className);
    option.forEach(element => {
        element.remove();
    });
}

function createTable(option) {
    clear('.table');
    if (option.value === 'Select value') {
        emptyTableText.classList.remove('hidden');
    } else {
        emptyTableText.classList.add('hidden');
        if (flag) {
            list = externalService.getCountryListByRegion(option.value);
        } else {
            list = externalService.getCountryListByLanguage(option.value);
        }
        table = document.createElement('table');
        let tr = document.createElement('tr');
        table.append(tr);
        for (let i = 0; i < theadName.length; i++) {
            let th = document.createElement('th');
            th.innerText = theadName[i];
            if (th.innerText === 'Country name') {
                arrowName.addEventListener('click', sortName);
                arrowName.className = 'arrowUp';
                th.append(arrowName);
            } else if (th.innerText === 'Area') {
                arrowArea.addEventListener('click', sortArea);
                arrowArea.className = 'arrowDefault';
                th.append(arrowArea);
            }
            tr.append(th);
        }

        table.className = 'table';
        sortUp('name');
        renderTable(table, list);
        appRoot.append(table);
    }
}

function renderTable(table, list) {
    clear('.rows');
    for (const country of list) {
        let tr = document.createElement('tr');
        tr.className = 'rows';
        table.append(tr);
        for (let i = 0; i < keyNames.length; i++) {
            if (keyNames[i] === 'flagURL') {
                let td = document.createElement('td');
                let image = document.createElement('img');
                image.src = country[keyNames[i]];
                td.append(image);
                tr.append(td);
            } else if (keyNames[i] === 'languages') {
                let td = document.createElement('td');
                td.innerText = Object.values(country[keyNames[i]]).join(', ');
                tr.append(td);
            } else {
                let td = document.createElement('td');
                td.innerText = country[keyNames[i]];
                tr.append(td);
            }
        }
    }
}

function sortName() {
    if (arrowName.className === 'arrowUp') {
        arrowName.className = 'arrowDown';
        sortDown('name');
    } else if (arrowName.className === 'arrowDown') {
        arrowName.className = 'arrowUp';
        sortUp('name');
    } else if (arrowName.className === 'arrowDefault') {
        arrowName.className = 'arrowUp';
        sortUp('name');
    }
    arrowArea.className = 'arrowDefault';
    renderTable(table, list);
}

function sortArea() {
    if (arrowArea.className === 'arrowDefault') {
        arrowArea.className = 'arrowUp';
        sortUp('area');
    } else if (arrowArea.className === 'arrowUp') {
        arrowArea.className = 'arrowDown';
        sortDown('area');
    } else if (arrowArea.className === 'arrowDown') {
        arrowArea.className = 'arrowUp';
        sortUp('area');
    }
    arrowName.className = 'arrowDefault';
    renderTable(table, list);
}

function sortUp(value) {
    list = list.sort((first, second) => {
        if (first[value] < second[value]) {
            return -1;
        }
        if (first[value] > second[value]) {
            return 1;
        }
        return 0;
    });
}

function sortDown(value) {
    list = list.sort((first, second) => {
        if (first[value] > second[value]) {
            return -1;
        }
        if (first[value] < second[value]) {
            return 1;
        }
        return 0;
    });
}


/*
write your code here

list of all regions
externalService.getRegionsList();
list of all languages
externalService.getLanguagesList();
get countries list by language
externalService.getCountryListByLanguage()
get countries list by region
externalService.getCountryListByRegion()
*/