'use strict';

import Model from './myModel/index.js';
import Query from './myQuery/index.js';
import {
    getNeighboursIndex,
    move,
    getterFactory,
    getSample,
    update,
    randomlySelectAndMoveAsync,
    showSolutionAsync
} from  './helper.js'
import Node from './node.js';
import {Type, Img} from './type.js';
import {selectElement} from './selector.js';
import {AStar} from './algorithm.js';

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
        time: 0,
        count: 0
    }
});

const util = {
    blankElement: document.querySelector('#blk-15'),
    loadingElement: document.querySelector('#loading'),
    btnElement: document.querySelector('#start'),
    selectorsElement: document.querySelector('.img-groups'),
    updater: update.bind(model)
};


model.$watch('imgUrl', function (newValue, oldValue) {
    const img = new Image();
    const ctxArray = this.blockMap.map(object => object.element.getContext('2d'));
    img.src = newValue;
    img.onload = () => {
        ctxArray.forEach((ctx, index) => {
            ctx.drawImage(img,
                (index % 4) * (img.width / 4), Math.floor(index / 4) * (img.height / 4),
                (img.width / 4), (img.height / 4),
                0, 0, 100, 100
            );
        });

        const last = ctxArray[ctxArray.length - 1];
        last.fillStyle = 'rgba(120, 120, 120, 0.7)';
        last.fillRect(0, 0, 100, 100);
    };
});

model.$watch('gameState', function (newValue, oldValue) {
    switch (newValue) {
        case Type.Pending:
            util.selectorsElement.classList.add('no-see');
            const timeUid = setInterval(() => {
                this.time++;
                if (this.gameState !== Type.Pending) {
                    clearInterval(timeUid);
                }
            }, 1000);
            break;
    }

    switch (oldValue) {
        case Type.Pending:
            util.selectorsElement.classList.remove('no-see');
            break;
    }
});

model.$watch('isRunning', function (isRunning) {
    if (isRunning) {
        util.btnElement.classList.add('disable-click');
        util.selectorsElement.classList.add('no-see');
    } else {
        util.btnElement.classList.remove('disable-click');
    }
});

model.imgUrl = './img/panda.jpg';

Query('#start')
    .on('click', e => {
        e.preventDefault();
        if (model.isRunning) {
            return;
        }
        switch (model.gameState) {

            case Type.Unstarted:

                model.startButton = 'Mixing...';
                const getElementIndex = getterFactory(model.blockMap, selectElement);
                const targetIndex = [
                    util.blankElement,
                    getElementIndex,
                    getNeighboursIndex,
                    getSample
                ].reduce((value, wrapper) => wrapper(value));

                new Promise((resolve, reject) => {
                    model.isRunning = true;
                    randomlySelectAndMoveAsync(30, 120, resolve)(
                        targetIndex, getElementIndex(util.blankElement), model.blockMap, util.updater
                    );
                }).then(node => {
                    model.isRunning = false;
                    model.startButton = 'Give Up : (';
                    model.gameState = Type.Pending;
                });
                break;

            case Type.Pending:
                new Promise((resolve, reject) => {
                    model.gameState = Type.Unstarted;
                    model.startButton = 'Getting Solution...';
                    util.loadingElement.classList.remove('disable-see');
                    const getIndex = getterFactory(model.blockMap, selectElement);
                    setTimeout(() => {
                        resolve(AStar(new Node(model.blockMap, getIndex(util.blankElement), null)));
                    }, 20);
                }).then(result => {

                    const path = [];
                    let target = result;
                    while (target.parentNode) {
                        path.push(target);
                        target = target.parentNode;
                    }

                    return new Promise((resolve, reject) => {
                        model.isRunning = true;
                        util.loadingElement.classList.add('disable-see');
                        model.startButton = 'Recovering...';
                        showSolutionAsync(path, util.updater, resolve);
                    });
                }).then(path => {
                    model.startButton = 'Try Again! : )';
                    model.isRunning = false;

                });
                break;
        }
    });

Query('.playground')
    .on('click', e => {
        e.preventDefault();
        const getIndex = getterFactory(model.blockMap, selectElement);
        const nextDescriptor = move(getIndex(e.target), getIndex(util.blankElement), model.blockMap);
        if (!nextDescriptor) return;
        update.call(model, nextDescriptor.state);
    });

Query('.img-groups')
    .on('click', e => {
        e.preventDefault();
        if (model.gameState === Type.Unstarted) {
            const currentImg = Img.find(imageInfo => imageInfo.name === e.target.id);
            model.imgUrl = currentImg.url.img;
        }
    });

console.log(model);