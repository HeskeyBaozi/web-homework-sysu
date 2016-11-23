'use strict';

/**
 * when the mouse enter the logo. reset the state and begin calculating.
 */

function defineAction(eventName) {
    $('.icon')
        .on(eventName, () => {
            reset();
            $('#button').toggleClass('on-hover');
        });
}


$('.button').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('disable'))
        return;
    clickButton($ctx)
        .then(() => enableBubble());
});

$('#info-bar').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('disable'))
        return;
    clickBubble($ctx);
});

/**
 * reset the state.
 */
function reset() {
    $('.button').removeClass('disable disable-fix fulfilled').children('span').text('').hide();
    $('#info-bar').addClass('disable').children('.info-result').text('');
    $('.top-message').text('');
}

/**
 * use ajax to get the number from the server.
 * @return {Promise}
 */
function fetchNumber() {
    return new Promise((resolve, reject) => {
        $.get('/', {
            _time: new Date().getTime() // avoid waiting.
        }, data => {
            resolve(data);
        });
    });
}

/**
 * click the button handler.
 * @param $ctx {Object} jQuery Object
 * @return {Promise}
 */
function clickButton($ctx) {
    $ctx.addClass('disable disable-fix').children('span').text('...').show();
    $ctx.siblings().addClass('disable');
    return fetchNumber().then(number => {
        $ctx.addClass('fulfilled').children('span').text(number);
        $ctx.siblings(':not(.disable-fix)').removeClass('disable');
        return number;
    });
}

/**
 * try to enable the bubble, return true if succeed.
 * @return {boolean}
 */
function enableBubble() {
    if ($('.fulfilled').length === 5) {
        $('#info-bar').removeClass('disable');
        return true;
    }
    return false;
}

/**
 * click the button and then try to enable the bubble.
 * @param $ctx {Object} jQuery Object
 * @return {Promise.<boolean>}
 */
function clickButtonAndEnableBubble($ctx) {
    return clickButton($ctx)
        .then(() => enableBubble());
}

/**
 * click the bubble handler.
 * @param $ctx {Object} jQuery Object
 * @return {Promise}
 */
function clickBubble($ctx) {
    return new Promise((resolve, reject) => {
        const sum = computeSum();
        $ctx.addClass('disable').children('.info-result').text(sum);
        resolve(sum);
    });
}

/**
 * compute the sum from the text content of the dom.
 * @return {number}
 */
function computeSum() {
    const numberArray = Array.from($('.button span').map((index, element) => Number.parseInt(element.textContent)));
    return numberArray.reduce((left, right) => left + right);
}