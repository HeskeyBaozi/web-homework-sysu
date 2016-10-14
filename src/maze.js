'use strict';

import $ from  './myQuery/index.js';
import {hasClass, addClass, removeClass} from './myQuery/helper.js';
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
    const content = $('.playground').removeClass('maze-pending');
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

model.$watch('isCheating', function (newValue, oldValue) {
    if (newValue === true) {
        model.message = 'Oops! You have got outside!?';
    }
});


$('.start')
    .on('mouseover', e => {
        model.gameState = Type.Pending;
    })
    .on('mouseleave', e => {
        if (hasClass.call(e.relatedTarget, 'container')) {
            model.isCheating = true;
        }
    });

$('.playground')
    .on('mousemove', e => {
        if (model.gameState === Type.Pending) {
            if (hasClass.call(e.target, 'wall')) {
                model.gameState = Type.Lose;
                displayWall(e.target);
            }
            if (hasClass.call(e.target, 'end')) {
                model.gameState = Type.Win;
            }
        }
    });

function displayWall(element) {
    addClass.call(element, 'highlight');
    setTimeout(() => {
        removeClass.call(element, 'highlight');
    }, 2000);
}


console.log(model);