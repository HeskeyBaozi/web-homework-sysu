'use strict';

import Model from './myModel/index.js';
import $ from 'jquery';
import _ from 'lodash';
import {
    move,
    getterFactory,
    update,
    showSolutionAsync,
    drawCanvas,
    mix,
    isSolved
} from  './helper.js'
import {Node} from './data-structure.js';
import {Type, Img} from './type.js';
import {selectElement} from './selector.js';
import {AStar} from './algorithm.js';

/**
 *           That's Me!
 *              ↓ ↓
 * View <==> View-Model <==> Model
 */
const model = new Model({
    target: '.container',
    data: {
        imgUrl: '',
        blockMap: Array
            .from(document.querySelectorAll('.block'))
            .map((element, index) => ({element, correctIndex: index})),
        startButton: 'Start!',
        gameState: Type.Unstarted,
        isRunning: false,
        isWinner: false,
        time: 0,
        count: 0,
        message: 'Welcome to play the Puzzle!!',
        stepNumber: 15
    }
});

/**
 * the jquery object cache.
 * @type {{$blank: (any), $loading: (any), $startBtn: (any), $selectors: (any), updater: (())}}
 */
const cache = {
    $blank: $('#blk-15'),
    $loading: $('#loading'),
    $startBtn: $('#start'),
    $selectors: $('.img-groups'),
    updater: update.bind(model)
};

/****************************************************************
 View-Callbacks
 1. watch the variable of the model.
 2. call the callback when the variable change.
 3. then update the view by operating on the DOM node.
 ****************************************************************/

/**
 * change the image.
 */
model.$watch('imgUrl', function (newValue, oldValue) {
    const img = new Image();
    const ctxArray = this.blockMap.map(object => object.element.getContext('2d'));
    img.src = newValue;
    img.onload = () => {
        drawCanvas(ctxArray, img);
    };
});

/**
 * use the default image: KongFu Panda.
 * @type {string}
 */
model.imgUrl = './img/panda.jpg';

/**
 * be reactive to the state of the game.
 */
model.$watch('gameState', function (newValue, oldValue) {
    /**
     * When the game starts...
     */
    if (Type.Pending === newValue) {
        handleBeginningGame(this);
    }
    /**
     * When the game over or give up.
     */
    if (Type.Pending === oldValue) {
        handleEndingGame(this);
    }
});

/**
 * normalize data & style.
 * @param model
 */
function handleBeginningGame(model) {
    normalizeInitialGameData(model);
    cache.$selectors.addClass('no-see');
    beginCount(model);
}

/**
 * set initial data of the game.
 * @param model
 */
function normalizeInitialGameData(model) {
    _.assign(model, {
        isRunning: false,
        startButton: 'Give Up : (',
        time: 0,
        count: 0,
        isWinner: false,
        message: 'Game Starting...'
    });
}

/**
 * counting the time every 1s.
 * @param model
 */
function beginCount(model) {
    const timeUid = setInterval(() => {
        if (model.gameState === Type.Pending) {
            model.time++;
        } else
            clearInterval(timeUid);
    }, 1000);
}

/**
 * set data & style when game ending.
 * @param model
 */
function handleEndingGame(model) {
    if (model.isWinner)
        cache.$selectors.removeClass('no-see');
    _.assign(model, {
        message: `${model.isWinner ? 'Congratulations!' : 'Try your best.'} Time:${model.time}, Count:${model.count}`,
        startButton: model.isWinner ? 'Start!' : 'Getting Solution...',
        time: 0,
        count: 0
    });
}

/**
 * watch the block moving. update the style.
 */
model.$watch('isRunning', function (isRunning) {
    if (isRunning) {
        cache.$startBtn.addClass('disable-click');
        cache.$selectors.addClass('no-see');
    } else {
        cache.$startBtn.removeClass('disable-click');
    }
});


/**
 * Move the block when it was clicked
 * if it is near the blank Block.
 */
$('.playground').click(e => {
    e.preventDefault();
    const getIndex = getterFactory(model.blockMap, selectElement);
    const nextDescriptor = move(getIndex(e.target), getIndex(cache.$blank[0]), model.blockMap);
    if (!nextDescriptor) return;
    update.call(model, nextDescriptor.state);
    handleMovedMap(model);
});

/**
 * set data & style after moving a block.
 * @param model
 */
function handleMovedMap(model) {
    if (isSolved(model.blockMap)) {
        model.isWinner = true;
        model.gameState = Type.Unstarted;
    }
    if (model.gameState === Type.Pending) {
        model.count++;
    }
}


cache.$startBtn.click(e => {
    e.preventDefault();
    /**
     * refuse when the animate running.
     */
    if (model.isRunning) return;
    if (model.gameState === Type.Unstarted) {
        startGame(model);
    } else if (model.gameState === Type.Pending) {
        stopGame(model);
    }

});

/**
 * turn to starting.
 * @param model {model}
 */
function startGame(model) {
    /**
     * Mix the puzzle.
     * @type {string}
     */
    model.startButton = 'Mixing...';
    mix(model, cache.$blank[0], cache.updater, selectElement)
        .then(() => {
            model.gameState = Type.Pending;
        });
}

/**
 * turn to stopping game.
 * @param model {model}
 */
function stopGame(model) {
    model.gameState = Type.Unstarted;
    handleStoppingGame(model);
    /**
     * Use Algorithm to solve the problem.
     */
    asyncRunningAlgorithm(AStar, generateInitialNode(model, selectElement))
        .then(resultNode => displaySolution(model, resultNode))
        .then(() => {
            handleEndingDisplaying(model);
        });
}

/**
 * generate a initial parent Node for the algorithm.
 * @param model
 * @param selector
 * @return {Node}
 */
function generateInitialNode(model, selector) {
    const getIndex = getterFactory(model.blockMap, selector);
    return new Node(model.blockMap, getIndex(cache.$blank[0]), null);
}

/**
 * set data & style when stopping the game.
 * @param model
 */
function handleStoppingGame(model) {
    cache.$loading.removeClass('disable-see');
}

/**
 * running the algorithm after the UI handler.
 * @param algorithm
 * @param args
 * @return {Promise}
 */
function asyncRunningAlgorithm(algorithm, args) {
    return new Promise((resolve, reject) => {
        _.delay(() => {
            resolve(algorithm(args));
        }, 20);
    });
}

/**
 * collect the solution path and display it.
 * @param model
 * @param resultNode
 * @return {Promise}
 */
function displaySolution(model, resultNode) {
    const path = collectSolutionPath(resultNode);
    handleResolvingDisplaying(model);
    return new Promise((resolve, reject) => {
        showSolutionAsync(path, cache.updater, resolve);
    });
}

/**
 * convert the result node into a solution path.
 * @param resultNode {Node}
 * @return {Array<Node>}
 */
function collectSolutionPath(resultNode) {
    const path = [];
    let target = resultNode;
    while (target.parentNode) {
        path.push(target);
        target = target.parentNode;
    }
    return path;
}

/**
 * set Data & style while displaying the solution.
 * @param model
 */
function handleResolvingDisplaying(model) {
    cache.$loading.addClass('disable-see');
    _.assign(model, {
        startButton: 'Recovering...',
        isRunning: true
    });
}

/**
 * set Data & style after displaying the solution.
 * @param model
 */
function handleEndingDisplaying(model) {
    cache.$selectors.removeClass('no-see');
    _.assign(model, {
        startButton: 'Try Again! : )',
        isRunning: false
    });
}

/**
 * the image switcher.
 */
cache.$selectors
    .click(e => {
        e.preventDefault();
        if (model.gameState === Type.Unstarted) {
            const currentImg = Img.find(imageInfo => imageInfo.name === e.target.id);
            if (currentImg)
                model.imgUrl = currentImg.url.img;
        }
    });

console.log(model);