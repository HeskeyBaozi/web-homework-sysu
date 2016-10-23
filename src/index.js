'use strict';

import Model from './myModel/index.js';
import Query from './myQuery/index.js';
import {
    move,
    getterFactory,
    update,
    showSolutionAsync,
    drawCanvas,
    mix
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


const cache = {
    blankElement: document.querySelector('#blk-15'),
    loadingElement: document.querySelector('#loading'),
    btnElement: document.querySelector('#start'),
    selectorsElement: document.querySelector('.img-groups'),
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
    switch (newValue) {
        /**
         * When the game starts...
         */
        case Type.Pending:
            this.time = 0;
            this.count = 0;
            this.isWinner = false;
            this.message = 'Game Starting...';
            cache.selectorsElement.classList.add('no-see');
            const timeUid = setInterval(() => {
                if (this.gameState === Type.Pending) {
                    this.time++;
                } else
                    clearInterval(timeUid);

            }, 1000);
            break;
    }

    switch (oldValue) {
        /**
         * When the game over or give up.
         */
        case Type.Pending:
            this.message = `${this.isWinner ? 'Congratulations!' : 'Try your best.'} Time:${this.time}, Count:${this.count}`;
            if (this.isWinner) {
                this.startButton = 'Start!';
                cache.selectorsElement.classList.remove('no-see');
            }
            this.time = 0;
            this.count = 0;
            break;
    }
});

/**
 * watch the block moving. update the style.
 */
model.$watch('isRunning', function (isRunning) {
    if (isRunning) {
        cache.btnElement.classList.add('disable-click');
        cache.selectorsElement.classList.add('no-see');
    } else {
        cache.btnElement.classList.remove('disable-click');
    }
});

/****************************************************************
 Event Handler
 ****************************************************************/

/**
 * Move the block when it was clicked
 * if it is near the blank Block.
 */
Query('.playground')
    .on('click', e => {
        e.preventDefault();
        const getIndex = getterFactory(model.blockMap, selectElement);
        const nextDescriptor = move(getIndex(e.target), getIndex(cache.blankElement), model.blockMap);
        if (!nextDescriptor) return;
        update.call(model, nextDescriptor.state);
        if (model.blockMap.every((object, index) => object.correctIndex === index)) {
            model.isWinner = true;
            model.gameState = Type.Unstarted;
        }
        if (model.gameState === Type.Pending) {
            model.count++;
        }
    });


Query('#start')
    .on('click', e => {
        e.preventDefault();
        /**
         * refuse when the animate running.
         */
        if (model.isRunning) {
            return;
        }
        switch (model.gameState) {
            case Type.Unstarted:
                /**
                 * Mix the puzzle.
                 * @type {string}
                 */
                model.startButton = 'Mixing...';
                mix(model, cache.blankElement, cache.updater, selectElement)
                    .then(() => {
                        model.isRunning = false;
                        model.startButton = 'Give Up : (';
                        model.gameState = Type.Pending;
                    });
                break;

            case Type.Pending:
                new Promise((resolve, reject) => {
                    model.gameState = Type.Unstarted;
                    model.startButton = 'Getting Solution...';
                    cache.loadingElement.classList.remove('disable-see');
                    const getIndex = getterFactory(model.blockMap, selectElement);
                    setTimeout(() => {
                        /**
                         * Use Algorithm to solve the problem.
                         */
                        resolve(AStar(new Node(model.blockMap, getIndex(cache.blankElement), null)));
                    }, 20);
                }).then(result => {
                    /**
                     * Display the Solution.
                     */
                    const path = [];
                    let target = result;
                    while (target.parentNode) {
                        path.push(target);
                        target = target.parentNode;
                    }

                    return new Promise((resolve, reject) => {
                        model.isRunning = true;
                        cache.loadingElement.classList.add('disable-see');
                        model.startButton = 'Recovering...';
                        showSolutionAsync(path, cache.updater, resolve);
                    });
                }).then(() => {
                    cache.selectorsElement.classList.remove('no-see');
                    model.startButton = 'Try Again! : )';
                    model.isRunning = false;
                });
                break;
        }
    });

/**
 * the image switcher.
 */
Query('.img-groups')
    .on('click', e => {
        e.preventDefault();
        if (model.gameState === Type.Unstarted) {
            const currentImg = Img.find(imageInfo => imageInfo.name === e.target.id);
            if (currentImg)
                model.imgUrl = currentImg.url.img;
        }
    });

console.log(model);