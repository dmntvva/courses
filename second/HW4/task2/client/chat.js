let socket = new WebSocket('ws://localhost:8080');
let messageBox = document.getElementById('messageBox');
let username = prompt('Enter your name.')
document.getElementById('button').addEventListener('click', send);

function send() {
    let dateNow = new Date();
    let text = document.getElementById('input');
    if (text.value) {
        socket.send(JSON.stringify({
            username,
            message: text.value,
            date: `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`
        }));
        renderMessage({
            username,
            message: text.value,
            date: `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`
        }, false);
    }
    text.value = '';
}
socket.onopen = function(e) {
    console.log(e);
}
socket.onmessage = function(event) {
    let obj = JSON.parse(event.data);
    renderMessage(obj, true);
}

function renderMessage(data, recipient) {
    let messageWrap = document.createElement('div');
    let name = document.createElement('p');
    let messageText = document.createElement('p');
    let messageDate = document.createElement('p');
    name.className = 'name';
    messageText.className = 'messageText';
    messageDate.className = 'messageDate';
    if (recipient) {
        messageWrap.className = 'left';
    } else {
        messageWrap.className = 'right';
    }
    name.innerText = data.username;
    messageText.innerText = data.message;
    messageDate.innerText = data.date;
    messageBox.append(messageWrap);
    messageWrap.append(name, messageText, messageDate);
}