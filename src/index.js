'use strict';

import Model from './myModel/index.js';
import Query from './myQuery/index.js';
import {getNeighbours, move, getterFactory, getSample, update, randomlySelectAndMove} from  './helper.js';

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
                (index % 4) * (img.width / 4), Math.floor(index / 4) * (img.height / 4),
                (img.width / 4), (img.height / 4),
                0, 0, 100, 100
            );
        });
    };
});

model.imgUrl = './img/panda.jpg';

Query('#start')
    .on('click', e => {
        e.preventDefault();
        const [
            updater,
            blankIndex
        ] = [
            update.bind(model),
            getterFactory(model.blockMap)(model.blankBlock)
        ];
        const moveBlock = getSample(getNeighbours(blankIndex, model.blockMap)).element;
        randomlySelectAndMove(50, 100)(moveBlock, blankIndex, model.blockMap, updater);
    });


Query('.playground')
    .on('click', e => {
        const nextDescriptor = move(e.target, model.blankBlock, model.blockMap);
        if (!nextDescriptor) return;
        update.call(model, nextDescriptor);
    });


console.log(model);