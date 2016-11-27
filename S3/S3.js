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

    /**
     * click the bubble after all promise were resolved.
     */
    parallel(callbackArray, (error, result) => {
        showSum();
        $ctx.removeClass('running');
    });
});

function parallel(array, finalCallback) {
    let count = 0;
    array.forEach((fn, index) => {
        fn((error, result) => {
            if (error) {
                throw error;
            } else {
                count++;
                if (count === array.length) {
                    finalCallback(null, result);
                }
            }
        });
    });
}