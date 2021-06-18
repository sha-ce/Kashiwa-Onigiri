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

});

const block = "block";
const blocktext = "block-text";
const namae = "name";
const text = "text";


function getThread() {
    fetch('https://t9f823.deta.dev/api/v1/threads')
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res);
            const data = res;
            let length = data.length;
            for (let i = length - 1; i >= 0; i--) {
                HTMLtext += "<div class=" + block + ">\n" + "<div class=" + blocktext + ">\n" + "<div class=" + namae + "><h5>" + data[i]["author"]["name"] + "</h5></div>\n" + "<div class=" + text + ">\n" + "<p>" + data[i]["name"] + "</p>\n" + "</div>\n</div>\n</div>";;
            }
            document.getElementById('threadscontainer').innerHTML = HTMLtext;
        })
        .catch(error => {
            console.log(error);
        });
}

let threadKey = 'xx8syv6jiea8';

window.onload = function getContent() {
    let HTMLtext = "";
    fetch('https://t9f823.deta.dev/api/v1/threads/' + threadKey + '/posts?limit=50&page=1')
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res);
            const data = res;
            let length = data.length;
            for (let i = length - 1; i >= 0; i--) {
                HTMLtext += "<div class=" + block + ">\n" + "<div class=" + blocktext + ">\n" + "<div class=" + namae + "><h5>" + data[i]["author"]["name"] + "</h5></div>\n" + "<div class=" + text + ">\n" + "<p>" + data[i]["content"] + "</p>\n" + "</div>\n</div>\n</div>";;
            }
            document.getElementById('threadscontainer').innerHTML = HTMLtext;
        })
        .catch(error => {
            console.log(error);
        });
}