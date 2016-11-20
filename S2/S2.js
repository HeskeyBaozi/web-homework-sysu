'use strict';

$('.icon').click(() => {
    reset();

    const flow = Array.from($('.button')) // convert into real array.
        .reduce(
            (myPromise, button) => {

                // add callback
                return myPromise.then(() => clickButtonAndEnableBubble($(button)));
            },
            Promise.resolve() // initial value
        );

    flow.then(() => clickBubble($('#info-bar')));
});
