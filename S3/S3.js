'use strict';

$('.icon').click(() => {
    reset();

    const asyncFlow = Array.from($('.button')).map(button => clickButtonAndEnableBubble($(button)));

    /**
     * click the bubble after all promise were resolved.
     */
    Promise.all(asyncFlow)
        .then(() => {
            clickBubble($('#info-bar'));
        });
});