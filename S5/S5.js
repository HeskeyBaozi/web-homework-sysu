'use strict';

$('.icon').click(() => {
    reset();
    const infoArray = [
        {
            id: 'A',
            successMessage: 'A:这是一个天大的秘密',
            failMessage: 'A:这不会是一个个天大的秘密'
        },
        {
            id: 'B',
            successMessage: 'B:我不知道',
            failMessage: 'B:我好像知道诶'
        },
        {
            id: 'C',
            successMessage: 'C:你不知道',
            failMessage: 'C:你好像知道诶'
        },
        {
            id: 'D',
            successMessage: 'D:他不知道',
            failMessage: 'D:他好像知道诶'
        },
        {
            id: 'E',
            successMessage: 'E:才怪',
            failMessage: 'E:是真的'
        }
    ];
    const shuffledArray = shuffle(infoArray);
    display(shuffledArray.map(option => option.id).reduce((left, right) => left + right));
    const handlers = shuffledArray.map(option => createButtonHandler(option));

    const flow = handlers.reduce((leftPromise, rightPromiseMaker) => {
        return leftPromise
            .then(successObject => {
                console.log(successObject);
                display(successObject.message);
                return successObject;
            })
            .catch(failObject => {
                console.log(failObject);
                display(failObject.message);
                return failObject;
            })
            .then(nextState => {
                return rightPromiseMaker(nextState);
            })
            .catch(nextState => {
                return rightPromiseMaker(nextState);
            });
    }, Promise.resolve({
        currentSum: 0
    }));


    flow.then(finalObject => {
        console.log(finalObject);
        display('大气泡：楼主异步调用战斗力感人，目测不超过');
        $('.info-result').text(finalObject.currentSum);
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

function createButtonHandler(option) {
    return function (currentState) {
        return clickButton($(`#${option.id}`))
            .then(number => {
                if (isFailedRandomly()) {
                    throw {
                        message: option.failMessage + ',失败',
                        currentSum: Number.parseInt(currentState.currentSum)
                    };
                } else {
                    enableBubble();
                    return {
                        message: option.successMessage + ',成功',
                        currentSum: Number.parseInt(currentState.currentSum) + Number.parseInt(number)
                    };
                }
            })
    };
}

function isFailedRandomly() {
    return Math.random() < 0.5;
}

function display(message) {
    $('.top-message').text(message);
}