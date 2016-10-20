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
    search
} from  './helper.js'
import Node from './node.js';

import {selectElement, selectNumber} from './selector.js';

const model = new Model({
    target: '.container',
    data: {
        imgUrl: '',
        blockMap: Array.from(document.querySelectorAll('.block'))
            .map((element, index) => ({
                element,
                correctIndex: index
            })),
        blankBlock: document.querySelector('#blk-15'),
        startButton: 'Start!',
        isReset: true,
        isBaffling: false
    }
});


model.$watch('imgUrl', function (newValue, oldValue) {
    if (!this.isReset)
        return;
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
        last.fillStyle = 'rgba(120, 120, 120, 0.3)';
        last.fillRect(0, 0, 100, 100);
    };
});

model.imgUrl = './img/panda.jpg';

Query('#start')
    .on('click', e => {
        e.preventDefault();
        if (model.isBaffling)
            return;
        const getIndex = getterFactory(model.blockMap, selectElement);
        const [
            updater,
            blankTargetIndex
        ] = [
            update.bind(model),
            getIndex(model.blankBlock)
        ];
        const targetIndex = getSample(getNeighboursIndex(blankTargetIndex));
        new Promise((resolve, reject) => {
            model.isBaffling = true;
            e.target.classList.add('disable-click');
            randomlySelectAndMoveAsync(25, 120, resolve)(targetIndex, blankTargetIndex, model.blockMap, updater);
        }).then(node => {
            model.isBaffling = false;
            e.target.classList.remove('disable-click');
        });

    });


Query('.playground')
    .on('click', e => {
        e.preventDefault();
        const getIndex = getterFactory(model.blockMap, selectElement);
        const nextDescriptor = move(getIndex(e.target), getIndex(model.blankBlock), model.blockMap);
        if (!nextDescriptor) return;
        update.call(model, nextDescriptor.state);
    });

Query('#solution')
    .on('click', e => {
        e.preventDefault();
        const loadingElement = document.querySelector('#loading');

        const updater = update.bind(model);
        const initialState = model.blockMap;
        const getIndex = getterFactory(model.blockMap, selectElement);
        const blankTargetIndex = getIndex(model.blankBlock);
        new Promise((resolve, reject) => {
            loadingElement.classList.remove('disable-see');
            resolve();
        }).then(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(AStar(new Node(initialState, blankTargetIndex, null)));
                }, 20);
            });
        }).then(result => {

            const path = [];
            let target = result;
            while (target.parentNode) {
                path.push(target);
                target = target.parentNode;
            }

            return new Promise((resolve, reject) => {
                e.target.classList.add('disable-click');
                loadingElement.classList.add('disable-see');
                showSolutionAsync(path, updater, resolve);
            });
        }).then(path => {
            e.target.classList.remove('disable-click');
        });
    })
;

function showSolutionAsync(path, updater, resolve) {
    if (path.length) {
        updater(path.pop().state);
        setTimeout(() => {
            showSolutionAsync(path, updater, resolve);
        }, 200);
    } else {
        resolve(path);
    }
}

function AStar(rootNode) {
    const Queue = [rootNode];
    const S = new Set();
    console.time('AStar');
    while (Queue.length) {
        const currentNode = Queue.shift();
        if (currentNode.state.map(selectNumber).every((object, index) => object === index)) {
            console.timeEnd('AStar');
            return currentNode;
        }

        const neighbours = getNeighboursIndex(currentNode.blankTargetIndex);
        neighbours.forEach(targetIndex => {
            const nextNode = search(targetIndex, currentNode);
            const signature = nextNode.state.map(selectNumber).join('-');
            if (!S.has(signature)) {
                Queue.push(nextNode);
                Queue.sort((left, right) => {
                    return (left.h + left.depth) - (right.h + right.depth);
                });
                S.add(signature);
            }
        });
    }
}

function IDAStar(rootNode) {
    const Stack = [rootNode];
    let bound = rootNode.h;
    console.time('IDAStar');
    while (bound) {
        while (Stack.length) {
            const currentNode = Stack.pop();
            if (currentNode.state.map(selectNumber).every((object, index) => object === index)) {
                console.timeEnd('IDAStar');
                return currentNode;
            }

            const neighbours = getNeighboursIndex(currentNode.blankTargetIndex);
            neighbours.forEach(targetIndex => {
                const nextNode = search(targetIndex, currentNode);
                const cost = nextNode.h + nextNode.depth;
                if (cost <= bound) {
                    Stack.push(nextNode);
                    console.log(Stack);
                }
            });
        }

        Stack.push(rootNode);
        bound++;
    }

}


console.log(model);