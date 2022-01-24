// fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((json) => console.log(json));
let userrr;
let root = document.getElementById('root');
let spinner = document.getElementById('spinner');
root.addEventListener('click', function(event) {
    let target = event.target;
    if (target.tagName === 'BUTTON') {
        if (target.className === 'edit') {
            let userName = document.getElementById(`userName${target.dataset.userId}`);
            let userEmail = document.getElementById(`userEmail${target.dataset.userId}`);
            if (target.innerText === 'Save') {
                let user = userrr[+target.dataset.userId];
                user.name = userName.value;
                user.email = userEmail.value;
                spinner.classList.remove('hidden');
                fetch(`https://jsonplaceholder.typicode.com/users/${target.dataset.userId}`, {
                        method: 'PUT',
                        body: JSON.stringify(user)
                    })
                    .then((response) => response.json())
                    .then(() => {
                        spinner.classList.add('hidden');
                        userName.disabled = true;
                        userEmail.disabled = true;
                        target.innerText = 'Edit';
                    });
            }
            userName.disabled = false;
            userEmail.disabled = false;
            target.innerText = 'Save';
        } else {
            spinner.classList.remove('hidden');
            fetch(`https://jsonplaceholder.typicode.com/users/${target.dataset.userId}`, {
                    method: 'DELETE'
                })
                .then((response) => response.json())
                .then(() => {
                    spinner.classList.add('hidden');
                    let usr = document.getElementById(target.dataset.userId);
                    usr.remove();
                });
        }
    } else {
        return;
    }

})
spinner.classList.remove('hidden');
fetch('https://jsonplaceholder.typicode.com/users', { method: 'GET' })
    .then((response) => response.json())
    .then((json) => {
        spinner.classList.add('hidden');
        userrr = json;
        console.log(userrr);
        for (let i = 0; i < json.length; i++) {
            let user = document.createElement('div');
            let userName = document.createElement('input');
            let userEmail = document.createElement('input');
            let editBtn = document.createElement('button');
            let deleteBtn = document.createElement('button');
            user.append(userName, userEmail, editBtn, deleteBtn);
            user.id = json[i].id;
            editBtn.innerText = 'Edit';
            editBtn.className = 'edit';
            deleteBtn.innerText = 'Delete';
            deleteBtn.className = 'delete';
            userName.id = `userName${json[i].id}`;
            userEmail.id = `userEmail${json[i].id}`;
            editBtn.dataset.userId = json[i].id;
            deleteBtn.dataset.userId = json[i].id;
            userName.disabled = true;
            userEmail.disabled = true;
            userName.value = json[i].name;
            userEmail.value = json[i].email;
            root.append(user);
        }
    });