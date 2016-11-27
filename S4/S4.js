'use strict';

$('.icon').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('running') || !$('#button').hasClass('on-hover')) // avoid called frequently...
        return;
    $ctx.addClass('running');
    reset();
    const asyncFlow = shuffle(Array.from($('.button')));

    /**
     * display the order.
     */
    display(asyncFlow.map(button => button.id).reduce((left, right) => left + right));

    const callbackArray = asyncFlow.map(button => {
        return callback => {
            clickButtonAndEnableBubbleCallback($(button), (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            });
        };
    });

    waterfall(callbackArray, (error, result) => {
        if (error) {
            throw error;
        } else {
            showSum();
            $ctx.removeClass('running');
        }
    });
});

/**
 * shuffle the array
 * @param array {Array}
 * @return {Array}
 */
function shuffle(array) {
    const upperBound = array.length - 1;
    const copy = array.slice();
    copy.forEach((element, index, array) => {
        let targetIndex = getRandomInt(index, upperBound);
        let temp = array[index];
        array[index] = array[targetIndex];
        array[targetIndex] = temp;
    });
    return copy;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function display(message) {
    if (message)
        $('.top-message').text(message);
}

/**
 * async waterfall
 * @param flowArray {Array<Function>}
 * @param finalCallback {Function}
 */
function waterfall(flowArray, finalCallback) {
    const fn = flowArray[0];
    let index = 1;

    function callback(error, result) {
        const next = flowArray[index++];
        if (next) {
            next(callback);
        } else {
            finalCallback(error, result);
        }
    }

    fn((error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    });
}