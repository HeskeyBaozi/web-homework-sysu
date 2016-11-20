'use strict';

$('.icon').click(() => {
    reset();
    const asyncFlow = shuffle(Array.from($('.button')));
    const orderString = asyncFlow.map(button => button.id).reduce((left, right) => left + right);
    $('.top-message').text(orderString);
    const flow = asyncFlow.reduce((myPromise, button) => {
        return myPromise.then(() => clickButtonAndEnableBubble($(button)));
    }, Promise.resolve());
    flow.then(() => clickBubble($('#info-bar')));
});

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