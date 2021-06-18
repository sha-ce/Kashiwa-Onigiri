function postSignUp() {
    let username = document.getElementById('name').value;
    let usermail = document.getElementById('email').value;
    let userpass = document.getElementById('password').value;
    let userdes = "よろしくお願いします。";
    let userup = {
        "name": username,
        "email": usermail,
        "password": userpass,
        "description": userdes
    }
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

let token;

function postSignIn() {
    let userinmail = document.getElementById('emailin').value;
    let userinpass = document.getElementById('passwordin').value;

    let userin = {
        "email": userinmail,
        "password": userinpass
    }
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
        .then(res => {
            console.log(res);
            token = res;
        })
        .catch(error => {
            console.log(error);
        });
}

function postConent() {
    let userinmail = document.getElementById('emailin').value;
    let userinpass = document.getElementById('passwordin').value;

    let userin = {
        "email": userinmail,
        "password": userinpass
    }
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
        .then(res => {
            console.log(res);
            token = res;
        })
        .catch(error => {
            console.log(error);
        });
}