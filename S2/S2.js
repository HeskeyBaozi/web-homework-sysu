'use strict';

$('.icon').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('running') || !$('#button').hasClass('on-hover')) // avoid called frequently...
        return;
    $ctx.addClass('running');
    reset();

    const flow = Array.from($('.button')) // convert into real array.
        .reduce(
            (myPromise, button) => {

                // add callback
                return myPromise.then(() => clickButtonAndEnableBubble($(button)));
            },
            Promise.resolve() // initial value
        );

    flow.then(() => {
        clickBubble($('#info-bar'));
        $ctx.removeClass('running');
    });
});
