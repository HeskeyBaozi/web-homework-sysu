'use strict';

$('.icon').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('running') || !$('#button').hasClass('on-hover')) // avoid called frequently...
        return;
    $ctx.addClass('running');
    reset();

    const asyncFlow = Array.from($('.button')).map(button => clickButtonAndEnableBubble($(button)));

    /**
     * click the bubble after all promise were resolved.
     */
    Promise.all(asyncFlow)
        .then(() => {
            clickBubble($('#info-bar'));
            $ctx.removeClass('running');
        });
});