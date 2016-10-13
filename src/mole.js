'use strict';

import Model from './myModel/index.js';

export const modelMole = new Model({
    target: '#mole .message',
    data: {
        time: 0,
        score: 0
    }
});

console.log('mole', modelMole);