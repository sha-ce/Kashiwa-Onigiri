let username = document.getElementById('name');
let usermail = document.getElementById('email');
let userpass = document.getElementById('password');
let userdes = "よろしく！";

let userup = {
    "name": username,
    "email": usermail,
    "password": userpass,
    "description": userdes
}

let userinmail = document.getElementById('mailin');
let userinpass = document.getElementById('asswordin');

let userin = {
    "email": userinmail,
    "password": userinpass
}

function JSONPostTest() {
    fetch('https://t9f823.deta.dev/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userup)
        })
        .then(response => {
            return response.json();
        })
        .then(res1 => {
            console.log(res1);
        })
        .catch(error => {
            console.log(error);
        });
}

function JSONPostTestin() {
    fetch('https://t9f823.deta.dev/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userin)
        })
        .then(response => {
            return response.json();
        })
        .then(res2 => {
            console.log(res2);
        })
        .catch(error => {
            console.log(error);
        });
}