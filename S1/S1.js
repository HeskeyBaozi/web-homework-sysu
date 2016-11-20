'use strict';


$('.icon')
    .mouseenter(() => {
        reset();
        $('#button').toggleClass('on-hover');
    });

$('.button').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('disable'))
        return;
    clickButton($ctx)
        .then(() => {
            if ($('.disable-fix').length === 5) {
                $('#info-bar').removeClass('disable');
            }
        });
});

$('#info-bar').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('disable'))
        return;
    clickBubble($ctx);
});


function reset() {
    $('.button').removeClass('disable disable-fix fulfilled').children('span').text('').hide();
    $('#info-bar').addClass('disable').children('.info-result').text('');
    $('.top-message').text('');
}

function fetchNumber() {
    return new Promise((resolve, reject) => {
        $.get('/', {
            _time: new Date().getTime()
        }, data => {
            resolve(data);
        });
    });
}

function clickButton($ctx) {
    $ctx.addClass('disable disable-fix').children('span').text('...').show();
    $ctx.siblings().addClass('disable');
    return fetchNumber().then(number => {
        $ctx.addClass('fulfilled').children('span').text(number);
        $ctx.siblings(':not(.disable-fix)').removeClass('disable');
        return number;
    });
}

function enableBubble() {
    if ($('.fulfilled').length === 5) {
        $('#info-bar').removeClass('disable');
        return true;
    }
    return false;
}

function clickButtonAndEnableBubble($ctx) {
    return clickButton($ctx)
        .then(() => enableBubble());
}

function clickBubble($ctx) {
    return new Promise((resolve, reject) => {
        const numberArray = Array.from($('.button span').map((index, element) => Number.parseInt(element.textContent)));
        const sum = numberArray.reduce((left, right) => left + right);
        $ctx.addClass('disable').children('.info-result').text(sum);
        resolve(sum);
    });
}