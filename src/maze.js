'use strict';

import Query from  './myQuery/index.js';
import {hasClass, addClassTemp} from './myQuery/helper.js';
import Model from './myModel/index.js';
import Type from './types.js';

/**
 * The model of the game: Maze
 * @type {Model}
 */
export const model = new Model({
    target: '#maze .message',
    data: {
        gameState: Type.Unstarted,
        isCheating: false,
        message: 'Welcome to Play the Maze!!!'
    }
});

/**
 * When your mouse get into the start box,
 * the game starts.
 */
Query('.start')
    .on('mouseover', e => {
        model.gameState = Type.Pending;
    });

/**
 * Check if you are cheating.
 */
Query('.end')
    .on('mouseenter', e => {
        if (hasClass.call(e.relatedTarget, 'container')) {
            model.isCheating = true;
        }

        if (model.gameState !== Type.Pending) {
            model.isCheating = true;
            model.gameState = Type.Win;
        }
    });

/**
 * When you're playing the game,
 * if you hit the wall careless, you'll lose.
 * And then the wall you hit will be clear to recognize.
 */
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


/**
 * Watch the state of the game,
 * display different message when there're different game's state.
 */
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

        case Type.Unstarted:
            this.message = 'Welcome to Play the Maze!!!';
            break;
    }
});

export default model;