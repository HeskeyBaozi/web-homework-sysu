'use strict';

import Model from './myModel/index.js';

const model = new Model({
    data: {
        image: new Image(),
        map: Array.from(document.querySelectorAll('.block'))
    }
});

const createCanvasSlicing = (img, playgroundWidth) => ({
    sWidth: img.width / 4,
    sHeight: img.height / 4,
    dWidth: playgroundWidth
});

model.image.src = 'img/panda.jpg';
model.image.onload = () => {
    const slicing = createCanvasSlicing(model.image, 100);
    model.map.map(canvas => canvas.getContext('2d')).forEach((ctx, index) => {
        ctx.drawImage(model.image,
            (index % 4) * slicing.sWidth,
            Math.floor(index / 4) * slicing.sHeight,
            slicing.sWidth,
            slicing.sHeight,
            0, 0, slicing.dWidth, slicing.dWidth);
    });
    console.log(model);
};