'use strict';

import Model from './myModel/index.js';
import Query from './myQuery/index.js';
import {addClass, removeClass} from './myQuery/helper.js';

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
            ctx.drawImage(img,
                (index % 4) * (img.width / 4),
                Math.floor(index / 4) * (img.height / 4),
                (img.width / 4),
                (img.height / 4),
                0, 0, 100, 100);
        });
    };
});

model.imgUrl = './img/panda.jpg';

Query('.playground').on('click', e => {
    const blockMap = model.blockMap;
    const targetIndex = blockMap.findIndex(object => {
        return object.element === e.target;
    });
    const blankIndex = blockMap.findIndex(object => {
        return object.element === model.blankBlock;
    });

    const neighbours = getNeighbours(targetIndex, blockMap);
    if (neighbours.some(object => object.element === model.blankBlock)) {
        const nextBlockMap = blockMap.slice();
        [
            nextBlockMap[targetIndex],
            nextBlockMap[blankIndex]
        ] = [
            blockMap[blankIndex],
            blockMap[targetIndex]
        ];
        const patches = diff(nextBlockMap, blockMap);
        render(patches, nextBlockMap);
        model.blockMap = nextBlockMap;
    }

});

function diff(newMap, oldMap) {
    const tokens = [];
    newMap.forEach((newObject, index) => {
        const oldObject = oldMap[index];
        if (newObject.correctIndex !== oldObject.correctIndex) {
            tokens.push({
                before: oldObject.correctIndex, //14
                after: newObject.correctIndex, //15
                index // 14
            });
        }
    });
    return tokens;
}

function render(patches, map) {
    patches.forEach(patch => {
        const target = map[patch.index].element;
        target.className = target.className.replace(/order-\d*/, `order-${patch.index}`);
    });
}

function getNeighbours(targetIndex, map) {
    return [
        {X: 0, Y: -1}, // up
        {X: 1, Y: 0}, // right
        {X: 0, Y: 1}, // down
        {X: -1, Y: 0} // left
    ].map(offset => ({
        X: targetIndex % 4 + offset.X,
        Y: Math.floor(targetIndex / 4) + offset.Y
    })).filter(position => (
        position.X >= 0 && position.X < 4 &&
        position.Y >= 0 && position.Y < 4
    )).map(position => map[position.X + position.Y * 4]);
}


console.log(model);