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
    data: {
        imgUrl: '',
        blockMap: Array.from(document.querySelectorAll('.block'))
            .map((element, index) => ({
                element,
                correctIndex: index
            })),
        blankBlock: document.querySelector('#blk-15'),
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
            randomlySelectAndMoveAsync(30, 120, resolve)(targetIndex, blankTargetIndex, model.blockMap, updater);
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
        const initialState = model.blockMap.map(selectNumber);
        const getIndex = getterFactory(model.blockMap, selectElement);
        const blankTargetIndex = getIndex(model.blankBlock);
        const result = BFS(new Node(initialState, blankTargetIndex, null));
        console.log(result);
    });

function BFS(initialNode) {
    const Q = [initialNode];
    const S = new Set();

    while (Q.length) {
        const currentNode = Q.shift();
        console.log('current currentNode: ', currentNode);
        console.log(Q);
        console.log(S);

        if (currentNode.state[15] === 15) {
            return currentNode;
        }

        const neighbours = getNeighboursIndex(currentNode.blankTargetIndex);
        neighbours.forEach(targetIndex => {
            const nextNode = search(targetIndex, currentNode);
            const signature = nextNode.state.join('-');
            if (!S.has(signature)) {
                Q.push(nextNode);
                S.add(signature);
            }
        });
    }
}


console.log(model);