/**
 * Created by Zhiyu He, 15331097, SDCS SYSU.
 */

'use strict';

defineAction('mouseenter mouseleave');

class State {
    /**
     * State Object
     * @param isSuccess {boolean}
     * @param message {string}
     * @param currentSum {number}
     * @param retryCallback {function}
     */
    constructor(isSuccess, message, currentSum, retryCallback) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.currentSum = typeof currentSum === 'number' ? currentSum : Number.parseInt(currentSum);
        this.retryCallback = retryCallback;
    }
}

/**
 * Add click event.
 */
$('.icon').click(e => {
    const $ctx = $(e.currentTarget);
    if ($ctx.hasClass('running')) // avoid called frequently...
        return;
    $ctx.addClass('running');

    reset();

    /**
     * the information for each button message.
     * @type {Object[]}
     */
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

    /**
     * get shuffle array.
     * @type {Array.<Object>}
     */
    const shuffledArray = shuffle(infoArray);

    /**
     * display the order
     */
    display(shuffledArray.map(option => option.id).reduce((left, right) => left + right));

    /**
     * handlers is an array of function that return a promise.
     * @type {Array<Function>}
     * it is equal to this:
     * const handlers = [aHandler, bHandler, cHandler, dHandler, eHandler]
     */
    const handlers = shuffledArray.map(option => createButtonHandler(option));

    /**
     * connect each handler by registering a callback.
     */
    const flow = handlers.reduce(
        (initialPromise, handler) => {
            return initialPromise.then(nextState => handleErrorAndShowMessage(handler(nextState)));
        }, Promise.resolve(new State(true, null, 0)) // initial value
    );

    /**
     * final state
     */
    flow.then(finalState => {
        display('大气泡：楼主异步调用战斗力感人，目测不超过');
        $('#info-bar').addClass('disable').children('.info-result').text(finalState.currentSum);
        $ctx.removeClass('running');
    });
});

/**
 * create a handler.
 * @param option
 * @return {Function} the handler
 */
function createButtonHandler(option) {
    return handler;

    /**
     * @param currentState {State}
     */
    function handler(currentState) {
        return clickButton($(`#${option.id}`))
            .then(number => {
                if (isFailedRandomly()) { // randomly failed
                    /**
                     * Attention!!
                     * Here we throw an Object because it failed.
                     * and pass in the callback..
                     */
                    throw new State(false, option.failMessage, currentState.currentSum, handler);
                } else {
                    enableBubble();
                    return new State(true, option.successMessage, currentState.currentSum + Number.parseInt(number));
                }
            })
    }
}

/**
 * show the failure/success message, handle the error and retry to call it again..
 * @param promise {Promise}
 * @return {Promise.<State>}
 */
function handleErrorAndShowMessage(promise) {
    return promise
        .catch(failState => {
            display(failState.message);
            /**
             * if catch the error. retry to call it again.
             */
            if (failState.retryCallback) {
                return handleErrorAndShowMessage(failState.retryCallback(failState));
            } else {
                throw new Error("You can't reach this error, because it will retry to get the number until it succeed.")
            }
        })
        .then(successState => {
            display(successState.message);
            return successState;
        });
}

/**
 * shuffle the array
 * @param array {Array<Object>}
 * @return {Array<Object>}
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

/**
 * get random number between min and max number.
 * @param min {number}
 * @param max {number}
 * @return {number}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * get random failure.
 * @return {boolean}
 */
function isFailedRandomly() {
    return Math.random() < 0.5;
}

/**
 * show the message above the big bubble.
 * @param message {string}
 */
function display(message) {
    if (message)
        $('.top-message').fadeIn().text(message);
}