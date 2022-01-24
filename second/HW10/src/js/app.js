import {
    goToLiked, like, unlike, showLiked, likedList
} from './likedpage.js'
import '../scss/styles.scss';
const root = document.getElementById('root');
let buttonAdd = document.querySelector('#addTweet');
let modify = document.getElementById('modifyItem');
let head = document.querySelector('.listPage h1');
let header = document.getElementById('modifyItemHeader');
let textArea = document.getElementById('modifyItemInput');
let errorMessage = document.getElementById('alertMessageText');
let errorWrap = document.getElementById('alertMessage');
let itemList = document.getElementById('list');
let likedBtn = document.createElement('button');
let back = document.createElement('button');
back.classList.add('hidden');
let timer;
let time = 2000;
likedBtn.innerText = 'Go to liked';
likedBtn.classList.add('hidden');
likedBtn.addEventListener('click', goToLiked);
document.getElementById('navigationButtons').append(likedBtn, back);
itemList.addEventListener('click', (event) => {
    if (event.target.className === 'delete') {
        event.target.parentNode.remove();
        localStorage.removeItem(event.target.dataset.tweetId);
    } else if (event.target.className === 'like') {
        like(event.target, event.target.dataset.tweetId);
    } else if (event.target.className === 'unlike') {
        unlike(event.target, event.target.dataset.tweetId);
    } else if (event.target.className === 'tweet') {
        window.location.hash = `#/edit/:item_${event.target.id}`
        textArea.value = JSON.parse(localStorage.getItem(event.target.id)).text;
    }
})

function changePage() {
    if (!window.location.hash) {
        render();
        head.innerText = 'Simple Twitter';
        buttonAdd.classList.remove('hidden');
        modify.classList.add('hidden');
        back.classList.add('hidden');
        document.getElementById('navigationButtons').classList.remove('hidden');
        head.classList.remove('hidden');
        itemList.classList.remove('hidden');
    } else if (window.location.hash === '#/add') {
        header.innerText = 'Add tweet';
        buttonAdd.classList.add('hidden');
        modify.classList.remove('hidden');
        head.classList.add('hidden');
        itemList.classList.add('hidden');
    } else if (window.location.hash === '#/liked') {
        modify.classList.add('hidden');
        buttonAdd.classList.add('hidden');
        likedBtn.classList.add('hidden');
        back.classList.remove('hidden');
        head.classList.remove('hidden');
        itemList.classList.remove('hidden');
    } else if (window.location.hash.includes('edit')) {
        header.innerText = 'Edit tweet';
        buttonAdd.classList.add('hidden');
        modify.classList.remove('hidden');
        head.classList.add('hidden');
        itemList.classList.add('hidden');
    }
}
window.addEventListener('popstate', changePage);
window.addEventListener('load', changePage);
document.getElementById('cancelModification').addEventListener('click', cancel);
document.getElementById('saveModifiedItem').addEventListener('click', save);
buttonAdd.addEventListener('click', addTweet);

function addTweet() {
    window.location = '#/add';
    textArea.value = '';
    document.getElementById('navigationButtons').classList.add('hidden');
}

export function cancel() {
    history.back();
}

function save() {
    if (!textArea.value) {
        return;
    } else {
        let repeat = false;
        let id = localStorage.length;
        let arr;
        for (let i = 0; i < localStorage.length; i++) {
            arr = localStorage.key(i);
            if (JSON.parse(localStorage.getItem(arr)).text === textArea.value && !location.hash.includes('edit')) {
                repeat = true;
            }
        }
        if (repeat === false) {
            const tweet = {
                text: textArea.value,
                isLiked: false
            };
            localStorage.setItem(id, JSON.stringify(tweet));
            createTweet(id);
            errorWrap.classList.add('hidden');

            window.location.hash = '';
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                errorWrap.classList.add('hidden');
                errorMessage.innerText = '';
            }, time);
            errorWrap.classList.remove('hidden');
            errorMessage.style.color = 'red';
            errorMessage.innerText = 'Error! You can\'t tweet about that.';
        }
    }
}

function createTweet(id) {
    let tweet = document.createElement('li');
    let del = document.createElement('button');
    let like = document.createElement('button');
    let twt = JSON.parse(localStorage.getItem(id));
    tweet.id = id;
    tweet.className = 'tweet';
    del.className = 'delete';
    del.innerText = 'Delete';
    like.className = twt.isLiked ? 'unlike' : 'like';
    like.innerText = twt.isLiked ? 'Unlike' : 'Like';
    del.dataset.tweetId = id;
    like.dataset.tweetId = id;
    tweet.innerText = twt.text;
    itemList.append(tweet);
    tweet.append(del, like);
}

function render() {
    let arr;
    document.querySelectorAll('li').forEach((element) => {
        element.remove();
    });

    for (let i = 0; i < localStorage.length; i++) {
        arr = localStorage.key(i);
        createTweet(arr);
    }
    likedList();
    if (location.hash === '#/liked') {
        showLiked();
    }
}
export { likedBtn, back, head, buttonAdd, time, errorMessage, errorWrap }
