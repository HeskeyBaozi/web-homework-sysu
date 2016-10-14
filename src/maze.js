'use strict';

import Query from  './myQuery/index.js';
import {hasClass, addClassTemp} from './myQuery/helper.js';
import Model from './myModel/index.js';
import Type from './types.js';

export const model = new Model({
    target: '#maze .message',
    data: {
        gameState: Type.Unstarted,
        isCheating: false,
        message: 'Welcome to Play the Maze!!!'
    }
});


model.$watch('gameState', function (newValue, oldValue) {
    const content = Query('.playground').removeClass('maze-pending');
    switch (newValue) {
        case Type.Pending:
            this.message = 'The Game have been started!';
            this.isCheating = false;
            content.addClass('maze-pending');
            break;

        case Type.Win:
            if (this.isCheating) {
                this.message = `Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!`;
                break;
            }
            this.message = 'You Win!';
            break;

        case Type.Lose:
            this.message = 'You Lose!';
            break;
    }
});

Query('.start')
    .on('mouseover', e => {
        model.gameState = Type.Pending;
    });

Query('.end')
    .on('mouseenter', e => {
        if (hasClass.call(e.relatedTarget, 'container')) {
            model.isCheating = true;
        }
    });

Query('.playground')
    .on('mousemove', e => {
        if (model.gameState === Type.Pending) {
            if (hasClass.call(e.target, 'wall')) {
                model.gameState = Type.Lose;
                addClassTemp(e.target, 'highlight', 2000);
            }
            if (hasClass.call(e.target, 'end')) {
                model.gameState = Type.Win;
            }
        }
    });

export default model;