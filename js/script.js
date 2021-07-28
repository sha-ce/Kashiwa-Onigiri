$(function() {

    var
        winW = $(window).width(),
        winH = $(window).height(),
        nav = $('#mainnav ul a'),
        curPos = $(this).scrollTop();

    if (winW > 880) {
        var headerH = 20;
    } else {
        var headerH = 60;
    }

    $(nav).on('click', function() {
        nav.removeClass('active');
        var $el = $(this),
            id = $el.attr('href');
        $('html, body').animate({
            scrollTop: $(id).offset().top - headerH
        }, 500);
        $(this).addClass('active');
        if (winW < 880) {
            $('#menuWrap').next().slideToggle();
            $('#menuBtn').removeClass('close');
        }
        return false;
    });

    $('.panel').hide();
    $('#menuWrap').toggle(function() {
            $(this).next().slideToggle();
            $('#menuBtn').toggleClass('close');
        },
        function() {
            $(this).next().slideToggle();
            $('#menuBtn').removeClass('close');
        });
    //enter + shift
    let textForm = document.getElementById('coment');
    let outPut = document.getElementById('output');
    document.addEventListener('keypress', events);

    function events(e) {
        if (e.keyCode === 13 && e.shiftKey === true) {
            const loader = document.getElementById('loader');
            postContent();
        }
        return false;
    }

    //loading
    window.onload = function loading() {
        if(localStorage.getItem('flag') != 1) {
            document.getElementById('profile').style.display='none';
            document.getElementById("signout").style.display = "none";
            document.getElementById("signinup").innerHTML =
              '<li><a href="./sign.html">sign in/up</a></li>';
        } else {
            document.getElementById("profile").innerHTML =
              '<li><a href="./profile.html" onclick="profile()">profile</a></li>';
            document.getElementById("signout").innerHTML =
              '<li><a href="javascript:signOut();">sign out</a></li>';
            document.getElementById("signinup").innerHTML =
              '<li><h2>'+localStorage.getItem("username")+'</h2></li>';
        }
        const loader = document.getElementById('loader');
        getContent();
        getThread();
        profile();
    }
});
//click
function heartClick(n) {
    heart = document.getElementById("heart"+n).innerHTML;
    onheart = '<i class="fas fa-heart"></i>';
    offheart = '<i class="far fa-heart"></i>';
    if(heart == onheart) {
        document.getElementById("heart"+n).innerHTML = offheart;
        console.log("iine???");
    } else if(heart == offheart) {
        document.getElementById("heart"+n).innerHTML = onheart;
        console.log("iine!!!");
    }
}

//コメント
function aroundchange() {
    console.log(document.getElementById('toukou').innerHTML);
    document.getElementById("toukou").innerHTML = '<div class="sroundComent2"><input class="coment" id="coment" type="text" autocomplete="off" onclick="aroundchange()" placeholder="コメントを投稿する"></div><div class="flex"><div class="underComment"><p>Shift + Enterで送信</p></div></div>';
    return 0;
}

//profile
function profile() {
    key = localStorage.getItem('userkey');
    yourname = localStorage.getItem('username');
    youremail = localStorage.getItem('useremail');
    description = localStorage.getItem('userdescription');
    console.log({
        'yourname': yourname,
        'youremail': youremail,
        'description': description
    })
    document.getElementById("yourname").innerHTML =
      "<h2>" + yourname + "</h2>";
    document.getElementById("youremail").innerHTML =
      "<p>email:&nbsp;&nbsp;&nbsp;&nbsp;" + youremail + "</p>";
    document.getElementById('description').innerHTML = '<p>'+description+'</p>';

    //getmycontent
    yourthreadText = "";
    fetch("https://t9f823.deta.dev/api/v1/threads?limit=100&page=1")
      .then((response) => {
      return response.json();
      })
      .then((res) => {
        //console.log(res);
        const threadData = res;
        let threadLength = threadData.length;
					for (let i = 0; i < threadLength; i++) {
						fetch("https://t9f823.deta.dev/api/v1/threads/" + threadData[i]['key'] + "/posts?limit=999&page=1")
							.then((response1) => {
								return response1.json();
							})
							.then((res1) => {
								//console.log(res1);
								const data = res1;
								let dataLength = data.length;
								for(j = 0; j < dataLength; j++) {
									if(dataLength != undefined) {
										if(data[j]['author_key'] == localStorage.getItem('userkey')) {
											yourthreadText +=
                        '<button type="button" onclick="getmycontent(' +
                        i +
                        ')" class="threadsBox"><div class="name">' +
                        threadData[i]["author"]["name"] +
                        '</div><div class="threadname">' +
                        threadData[i]["name"] +
                        "</div></button>";
											break;
										}
									}
								}
								if (i == threadLength - 1) {
                  loader.classList.add("loaded");
                }
								document.getElementById("yourthreadscontainer").innerHTML = yourthreadText;
							})
							.catch((error1) => {
								console.log(error1);
							});
					}
      })
      .catch((error) => {
      console.log(error);
      });
}
//getmycontent
function getmycontent(n) {
	text =
    '<div id="loader" class="sk-fading-circle mediam"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>';
  document.getElementById("yourcontentcontainer").innerHTML = text;
	let mycontenttext = "";
	fetch("https://t9f823.deta.dev/api/v1/threads?limit=100&page=1")
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      //console.log(res);
      const threadData = res;
      let threadLength = threadData.length;
      for (let j = 0; j < threadLength; j++) {
				if(j == n) {
					fetch("https://t9f823.deta.dev/api/v1/threads/" + threadData[j]["key"] + "/posts?limit=999&page=1")
						.then((response1) => {
							return response1.json();
						})
						.then((res1) => {
							//console.log(res1);
							const data = res1;
							let length = data.length;
							for (let i = 0; i < length; i++) {
								if (data[i]["author_key"] == localStorage.getItem("userkey")) {
									mycontenttext +=
										'<div class="block">\n' +
										'<div class="block-text">\n' +
										'<div class="name"><h5>' +
										data[i]["author"]["name"] +
										"</h5></div>\n" +
										'<div class="text">\n' +
										"<p>" +
										data[i]["content"] +
										"</p>\n" +
										'<a type="button" onclick="heartClick(' +
										i +
										')" class="heart" id="heart' +
										i +
										'"><i class="far fa-heart"></i></a>' +
										'<a type="button" onclick="trash(' +
										i +
										')" class="trash" id="trash' +
										i +
										'"><i class="fas fa-times"></i></a>' +
										"</div>\n</div></div>";
								}
							}
							localStorage.setItem('thKey', threadData[j]['key']);
							localStorage.setItem('threadName', threadData[j]['name']);
							document.getElementById("yourcontentcontainer").innerHTML = mycontenttext;
							document.getElementById("yourthreadname").innerHTML =
                '<p>"' + threadData[n]['name'] + '"</p>';
						})
						.catch((error1) => {
							console.log(error1);
						});
				}
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function getmycontenttrash() {
  text =
    '<div id="loader" class="sk-fading-circle mediam"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>';
  document.getElementById("yourcontentcontainer").innerHTML = text;
  let mycontenttext = "";
	threadkeytrash = localStorage.getItem('thKey');
  fetch("https://t9f823.deta.dev/api/v1/threads?limit=100&page=1")
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      //console.log(res);
			fetch("https://t9f823.deta.dev/api/v1/threads/" + threadkeytrash + "/posts?limit=999&page=1")
				.then((response1) => {
					return response1.json();
				})
				.then((res1) => {
					//console.log(res1);
					const data = res1;
					let length = data.length;
					for (let i = 0; i < length; i++) {
						if (data[i]["author_key"] == localStorage.getItem("userkey")) {
							mycontenttext +=
								'<div class="block">\n' +
								'<div class="block-text">\n' +
								'<div class="name"><h5>' +
								data[i]["author"]["name"] +
								"</h5></div>\n" +
								'<div class="text">\n' +
								"<p>" +
								data[i]["content"] +
								"</p>\n" +
								'<a type="button" onclick="heartClick(' +
								i +
								')" class="heart" id="heart' +
								i +
								'"><i class="far fa-heart"></i></a>' +
								'<a type="button" onclick="trash(' +
								i +
								')" class="trash" id="trash' +
								i +
								'"><i class="fas fa-times"></i></a>' +
								"</div>\n</div></div>";
						}
					}
					document.getElementById("yourcontentcontainer").innerHTML =
						mycontenttext;
					document.getElementById("yourthreadname").innerHTML =
            '<p>"' + localStorage.getItem("threadName") + '"</p>';
				})
				.catch((error1) => {
					console.log(error1);
				});
    })
    .catch((error) => {
      console.log(error);
    });
}


// 1. onchange属性に設定した関数
function OutputImage(target)
{
    // 2. ファイル読み込みクラス
    var reader = new FileReader();

    // 3. 読み込みクラスの準備が終わった後、画像の情報を設定
    reader.onload = function () {
        $sample2 = $("#sample2");

        // 4. Imageクラスを使ってdiv要素に
        img = new Image();
        img.src = this.result;
        // 5. backgroundスタイルを設定
        $sample2.css("background", "url(" + this.result + ") center center / contain no-repeat");
    }
    // 6. 読み込んだ画像ファイルをURLに変換
    reader.readAsDataURL(target.files[0]);
}
