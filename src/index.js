'use strict';

import Model from './myModel/index.js';
import Query from './myQuery/index.js';
import {getNeighbours, move, getterFactory, getRandomInt, update} from  './helper.js';

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
            ctx.drawImage(
                img,
                (index % 4) * (img.width / 4),
                Math.floor(index / 4) * (img.height / 4),
                (img.width / 4),
                (img.height / 4),
                0, 0, 100, 100
            );
        });
    };
});

model.imgUrl = './img/panda.jpg';

Query('#start')
    .on('click', e => {
        randomlySelect(model.blockMap, model.blankBlock);
    });

function randomlySelect(map, blankBlock) {
    const updateModel = update.bind(model);
    /**
     * first
     */
    const blankIndex = getterFactory(map)(blankBlock);
    const blankTargetNeighbours = getNeighbours(blankIndex, map); // 空白块的邻居
    const moveBlock = blankTargetNeighbours[getRandomInt(0, blankTargetNeighbours.length - 1)].element;
    randomlyMove(moveBlock, blankIndex, map, updateModel);
}

function randomlyMove(previousBlock, blankTargetIndex, map, updater) {
    const blankTargetNeighbours = getNeighbours(blankTargetIndex, map).filter(object => {
        return object.element !== previousBlock;
    });
    const moveBlock = blankTargetNeighbours[getRandomInt(0, blankTargetNeighbours.length - 1)].element;
    const nextDescriptor = move(moveBlock, map[blankTargetIndex].element, map);
    const removedBlock = moveBlock;
    updater(nextDescriptor);
    blankTargetIndex = nextDescriptor.blankTargetPath.to;
    setTimeout(() => {
        randomlyMove(removedBlock, blankTargetIndex, nextDescriptor.nextState, updater);
    }, 200);
}

Query('.playground')
    .on('click', e => {
        const nextDescriptor = move(e.target, model.blankBlock, model.blockMap);
        if (!nextDescriptor) return;
        /**
         * from blackIndex to targetIndex
         */
        update.call(model, nextDescriptor);
    });


console.log(model);