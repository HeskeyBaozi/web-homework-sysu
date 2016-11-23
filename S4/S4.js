'use strict';

defineAction('mouseenter mouseleave');

$('.icon').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('running')) // avoid called frequently...
        return;
    $ctx.addClass('running');
    reset();
    const asyncFlow = shuffle(Array.from($('.button')));

    /**
     * display the order.
     */
    display(asyncFlow.map(button => button.id).reduce((left, right) => left + right));


    const flow = asyncFlow.reduce(
        (myPromise, button) => {

            // add callback
            return myPromise.then(() => clickButtonAndEnableBubble($(button)));
        }, Promise.resolve() // initial value.
    );
    flow.then(() => {
        clickBubble($('#info-bar'));
        $ctx.removeClass('running');
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