'use strict';

import $ from  './myQuery/index.js';
import {hasClass, addClass, removeClass} from './myQuery/helper.js';
import Model from './myModel/index.js';

const Type = {
    Unstarted: 'UNSTARTED',
    Pending: 'PENDING',
    Win: 'WIN',
    Lose: 'LOSE'
};

export const modelMaze = new Model({
    target: '#maze .message',
    data: {
        gameState: Type.Unstarted,
        isCheating: false,
        message: 'Welcome to Play the Maze!!!'
    }
});


modelMaze.$watch('gameState', function (newValue, oldValue) {
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

modelMaze.$watch('isCheating', function (newValue, oldValue) {
    if (newValue === true) {
        modelMaze.message = 'Oops! You have got outside!?';
    }
});


$('.start')
    .on('mouseover', e => {
        modelMaze.gameState = Type.Pending;
    })
    .on('mouseleave', e => {
        if (hasClass.call(e.relatedTarget, 'container')) {
            modelMaze.isCheating = true;
        }
    });

$('.playground')
    .on('mousemove', e => {
        if (modelMaze.gameState === Type.Pending) {
            if (hasClass.call(e.target, 'wall')) {
                modelMaze.gameState = Type.Lose;
                displayWall(e.target);
            }
            if (hasClass.call(e.target, 'end')) {
                modelMaze.gameState = Type.Win;
            }
        }
    });

function displayWall(element) {
    addClass.call(element, 'highlight');
    setTimeout(() => {
        removeClass.call(element, 'highlight');
    }, 2000);
}


console.log(modelMaze);