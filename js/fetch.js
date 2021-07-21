var threadKey = 'xx8syv6jiea8'; //defo

function getThread() {
    threadText = '';
    fetch('https://t9f823.deta.dev/api/v1/threads?limit=100&page=1')
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res);
            const threadData = res;
            let threadLength = threadData.length;
            for (let i = 0; i < threadLength; i++) {
                threadText += '<button type="button" onclick="getKey('+i+')" class="threadsBox"><div class="name">' + threadData[i]['author']['name'] + '</div><div class="threadname">' + threadData[i]['name'] + '</button>';
            }
            document.getElementById('threads').innerHTML = threadText;
            loader.classList.add('loaded');
        })
        .catch(error => {
            console.log(error);
        });
}
var newthreadKey;
function getKey(i) {
    fetch("https://t9f823.deta.dev/api/v1/threads?limit=100&page=1")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        newthreadKey = res[i]['key'];
        console.log(res[i]['key']);
        localStorage.setItem('thKey', newthreadKey);
        location.href = "./index.html";
      })
      .catch((error) => {
        console.log(error);
      });
}

//仮
function postThread() {
    let mycoment = document.getElementById('coment').value;
    if (mycoment == "") {
        return console.log("error: please wirte a coment");
    }

    newthreadKey = localStorage.getItem('thKey');
    let param = {
        "thread_key": newthreadKey,
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

function getContent() {
    newthreadKey = localStorage.getItem('thKey');
    let HTMLtext = "";
    fetch('https://t9f823.deta.dev/api/v1/threads/' + newthreadKey + '/posts?limit=50&page=1')
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res);
            const data = res;
            let length = data.length;
            for (let i = 0; i < length; i++) {
                HTMLtext += '<div class="block">\n' + '<div class="block-text">\n' + '<div class="name"><h5>' + data[i]["author"]["name"] + '</h5></div>\n' + '<div class="text">\n' + '<p>' + data[i]["content"] + '</p>\n' + '<button type="button" onclick="click()" id="heart"><i class="far fa-heart"></i></button>' + '</div>\n</div>\n</div>';
            }
            document.getElementById('threadscontainer').innerHTML = HTMLtext;
            loader.classList.add('loaded');
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

    newthreadKey = localStorage.getItem("thKey");
    let param = {
        "thread_key": newthreadKey,
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

// function textSignIn() {
//     document.getElementById('loader').style.display = 'none';
//     let signInText = "";
//     document.getElementById('imformation2').innerHTML = signInText;
//     loader.classList.add('loaded');
// }

// function textSignUp() {
//     document.getElementById('loader').style.display = 'none';
//     document.getElementById('information1').innerHTML = signUpText;
//     loader.classList.add('loaded');
// }
