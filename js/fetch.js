let threadKey = 'xx8syv6jiea8'; //defo

function getThread() {
    fetch('https://t9f823.deta.dev/api/v1/threads')
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res);
            threadKey = res[1]['key'];
            console.log(threadKey);
        })
        .catch(error => {
            console.log(error);
        });
}

//仮
function postThread() {
    let mycoment = document.getElementById('coment').value;
    if (mycoment == "") {
        return console.log("error: please wirte a coment");
    }

    let param = {
        "thread_key": threadKey,
        "content": mycoment
    }
    let token = localStorage.getItem('token');
    if (token == '') {
        return console.log('error: please sign in');
    }
    fetch('https://t9f823.deta.dev/api/v1/posts', {
            method: 'POST',
            headers: {
                'jwt-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res);
            if (res)
                location.href = "./index.html";
        })
        .catch(error => {
            console.log(error);
        });
}

const block = "block";
const blocktext = "block-text";
const namae = "name";
const text = "text";

window.onload = function getContent() {
    let HTMLtext = "";
    fetch('https://t9f823.deta.dev/api/v1/threads/' + threadKey + '/posts?limit=30&page=1')
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res);
            const data = res;
            let length = data.length;
            for (let i = 0; i < length; i++) {
                HTMLtext += "<div class=" + block + ">\n" + "<div class=" + blocktext + ">\n" + "<div class=" + namae + "><h5>" + data[i]["author"]["name"] + "</h5></div>\n" + "<div class=" + text + ">\n" + "<p>" + data[i]["content"] + "</p>\n" + "</div>\n</div>\n</div>";;
            }
            document.getElementById('threadscontainer').innerHTML = HTMLtext;
        })
        .catch(error => {
            console.log(error);
        });
}

function postSignUp() {
    let username = document.getElementById('name').value;
    let usermail = document.getElementById('email').value;
    let userpass = document.getElementById('password').value;
    let userdes = "よろしくお願いします。";
    if (username == '' || usermail == '' || userpass == '') {
        return console.log("error: please write your imformation")
    }
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
            location.href = "./sign.html";
        })
        .catch(error => {
            console.log(error);
        });
}

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
            if (res['jwt'] == undefined) {
                return console.log('error: user not found');
            }
            let jwt = 'Bearer ' + res['jwt'];
            localStorage.setItem('token', jwt);
            console.log(jwt);
            location.href = "./index.html";
        })
        .catch(error => {
            console.log(error);
        });
}

function signOut() {
    localStorage.setItem('token', '');
    console.log("deketa!!");
    document.getElementById('signout').innerHTML = '';
}

function postContent() {
    let mycoment = document.getElementById('coment').value;
    if (mycoment == "") {
        return console.log("error: please wirte a coment");
    }

    let param = {
        "thread_key": threadKey,
        "content": mycoment
    }
    let token = localStorage.getItem('token');
    if (token == '') {
        return console.log('error: please sign in');
    }
    fetch('https://t9f823.deta.dev/api/v1/posts', {
            method: 'POST',
            headers: {
                'jwt-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res);
            if (res)
                location.href = "./index.html";
        })
        .catch(error => {
            console.log(error);
        });
}