'use strict';

$('.icon').click(() => {
    reset();
    const asyncFlow = Array.from($('.button')).map(button => clickButtonAndEnableBubble($(button)));
    Promise.all(asyncFlow).then(() => {
        clickBubble($('#info-bar'));
    })
});