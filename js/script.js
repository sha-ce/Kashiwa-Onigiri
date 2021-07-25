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
        const loader = document.getElementById('loader');
        getContent();
        getThread();
    }
});

