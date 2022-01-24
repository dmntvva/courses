function visitLink(path) {
    let count = 0;
    let increment;
    if (localStorage.getItem(path) === null) {
        localStorage.setItem(path, count);
    } else {
        increment = parseInt(localStorage.getItem(path)) + 1;
        localStorage.setItem(path, increment);
    }

}

function viewResults() {
    if (document.querySelector('.resultWr')) {
        document.querySelector('.resultWr').remove();
    }
    let resultWrapper = document.createElement('ul');
    resultWrapper.className = 'resultWr';
    for (let i = 0; i < localStorage.length; i++) {
        let result = document.createElement('li');
        let key = localStorage.key(i);
        result.className = 'result';
        result.innerHTML = `You visited ${key} ${localStorage.getItem(key)} times`;
        resultWrapper.append(result);
        resultWrapper.style.marginLeft = '400px';
    }
    document.body.append(resultWrapper);
}