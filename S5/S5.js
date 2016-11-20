'use strict';

class State {
    constructor(isSuccess, message, currentSum) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.currentSum = typeof currentSum === 'number' ? currentSum : Number.parseInt(currentSum);
    }
}

/**
 * create a handler.
 * @param option
 * @return {Function}
 */
function createButtonHandler(option) {
    /**
     * @param currentState {State}
     */
    return function (currentState) {
        return clickButton($(`#${option.id}`))
            .then(number => {
                if (isFailedRandomly()) { // randomly failed
                    throw new State(false, option.failMessage, currentState.currentSum);
                } else {
                    enableBubble();
                    return new State(true, option.successMessage, currentState.currentSum + Number.parseInt(number));
                }
            })
    };
}

$('.icon').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('running')) // avoid called frequently...
        return;
    $ctx.addClass('running');

    reset();
    const infoArray = [
        {
            id: 'A',
            successMessage: 'A:这是一个天大的秘密',
            failMessage: 'A:这不会是一个个天大的秘密(失败)'
        },
        {
            id: 'B',
            successMessage: 'B:我不知道',
            failMessage: 'B:我好像知道诶(失败)'
        },
        {
            id: 'C',
            successMessage: 'C:你不知道',
            failMessage: 'C:你好像知道诶(失败)'
        },
        {
            id: 'D',
            successMessage: 'D:他不知道',
            failMessage: 'D:他好像知道诶(失败)'
        },
        {
            id: 'E',
            successMessage: 'E:才怪',
            failMessage: 'E:是真的(失败)'
        }
    ];
    const shuffledArray = shuffle(infoArray);

    /**
     * display the order
     */
    display(shuffledArray.map(option => option.id).reduce((left, right) => left + right));

    /**
     * handlers is an array of function that return a promise.
     * @type {Array<Function>}
     */
    const handlers = shuffledArray.map(option => createButtonHandler(option));
    const flow = handlers.reduce(
        (leftPromise, rightPromiseMaker) => {
            return leftPromise
                .then(successState => {
                    display(successState.message);
                    return successState;
                })
                .catch(failState => {
                    display(failState.message);
                    return failState;
                })
                .then(nextState => rightPromiseMaker(nextState));
        }, Promise.resolve(new State(true, null, 0)) // initial value
    );

    /**
     * final state
     */
    flow.catch(finalState => finalState)
        .then(finalState => {
            display('大气泡：楼主异步调用战斗力感人，目测不超过');
            $('#info-bar').addClass('disable').children('.info-result').text(finalState.currentSum);
            $ctx.removeClass('running');
        });
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

function isFailedRandomly() {
    return Math.random() < 0.5;
}

function display(message) {
    if (message)
        $('.top-message').text(message);
}