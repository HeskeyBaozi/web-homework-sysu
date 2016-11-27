'use strict';

$('.icon').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('running') || !$('#button').hasClass('on-hover')) // avoid called frequently...
        return;
    $ctx.addClass('running');
    reset();

    const callbackArray = Array.from($('.button')).map(button => {
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
