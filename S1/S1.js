'use strict';

/**
 * when the mouse enter the logo. reset the state and begin calculating.
 */

$('.icon')
    .mouseenter(() => {
        reset();
        $('#button').toggleClass('on-hover');
    });


$('.button').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('disable'))
        return;
    clickButtonAndEnableBubbleCallback($ctx, (error, result) => null);
});

$('#info-bar').click(e => {
    showSum();
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
 * Async
 * use ajax to get the number from the server.
 */
function fetchNumberCallback(callback) {
    $.get('/', {
        _time: new Date().getTime() // avoid waiting.
    }, data => {
        callback(null, data);
    });
}

/**
 * Async
 * click the button handler.
 * @param $ctx {Object} jQuery Object
 * @param callback {Function}
 */
function clickButtonCallback($ctx, callback) {
    $ctx.addClass('disable disable-fix').children('span').text('...').show();
    $ctx.siblings().addClass('disable');
    fetchNumberCallback((error, number) => {
        if (error) {
            callback(error);
        } else {
            $ctx.addClass('fulfilled').children('span').text(number);
            $ctx.siblings(':not(.disable-fix)').removeClass('disable');
            callback(null, number);
        }
    });
}

/**
 * try to enable the bubble, return true if succeed.
 * callback {boolean}
 */
function enableBubbleCallback(callback) {
    if ($('.fulfilled').length === 5) {
        $('#info-bar').removeClass('disable');
        callback(null, true);
    } else {
        callback(null, false);
    }
}

/**
 * click the button and then try to enable the bubble.
 * @param $ctx {Object} jQuery Object
 * @param callback {Function}
 */
function clickButtonAndEnableBubbleCallback($ctx, callback) {
    clickButtonCallback($ctx, (error, number) => {
        if (error) {
            callback(error);
        } else {
            enableBubbleCallback((error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

/**
 * display the sum
 */
function showSum() {
    const $ctx = $('#info-bar');
    if ($ctx.hasClass('disable'))
        return;
    $ctx.addClass('disable').children('.info-result').text(computeSum());
}

/**
 * compute the sum from the text content of the dom.
 * @return {number}
 */
function computeSum() {
    const numberArray = Array.from($('.button span').map((index, element) => Number.parseInt(element.textContent)));
    return numberArray.reduce((left, right) => left + right);
}