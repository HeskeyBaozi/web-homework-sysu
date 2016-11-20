'use strict';

$('.icon').click(() => {
    reset();
    const asyncFlow = Array.from($('.button'));
    const flow = asyncFlow.reduce((myPromise, button) => {
        return myPromise.then(() => clickButtonAndEnableBubble($(button)));
    }, Promise.resolve());
    flow.then(() => clickBubble($('#info-bar')));
});
