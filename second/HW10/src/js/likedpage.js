import {
    cancel, likedBtn, back, head, buttonAdd, time, errorMessage, errorWrap
} from './app.js';
let timer;
export function likedList() {
    if (document.querySelector('.unlike')) {
        likedBtn.classList.remove('hidden');
    } else {
        likedBtn.classList.add('hidden');
    }
}
export function showLiked() {
    let liked = document.querySelectorAll('.like');
    liked.forEach(element => {
        element.parentNode.remove();
    });
}

export function goToLiked() {
    window.location = '#/liked';
    showLiked();
    back.addEventListener('click', cancel);
    back.innerText = 'Back';
    head.innerText = 'Liked Tweets';
    buttonAdd.classList.add('hidden');
    likedBtn.classList.add('hidden');
}

export function like(button, id) {
    button.classList.remove('like');
    button.classList.add('unlike');
    likedList();
    button.innerText = 'Unlike';
    let twt = JSON.parse(localStorage.getItem(id));
    twt.isLiked = true;
    localStorage.setItem(id, JSON.stringify(twt));
    clearTimeout(timer);
    timer = setTimeout(() => {
        errorWrap.classList.add('hidden');
        errorMessage.innerText = '';
    }, time);
    errorWrap.classList.remove('hidden');
    errorMessage.style.color = 'green';
    errorMessage.innerText = `Hooray! You liked tweet with id ${id}`;

}

export function unlike(button, id) {
    button.classList.remove('unlike');
    button.classList.add('like');
    button.innerText = 'Like';
    let twt = JSON.parse(localStorage.getItem(id));
    twt.isLiked = false;
    localStorage.setItem(id, JSON.stringify(twt));
    if (location.hash === '#/liked') {
        showLiked();
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
        errorWrap.classList.add('hidden');
        errorMessage.innerText = '';
    }, time);
    errorWrap.classList.remove('hidden');
    errorMessage.style.color = 'red';
    errorMessage.innerText = `Sorry you no longer like a tweet with id ${id}`;
}
