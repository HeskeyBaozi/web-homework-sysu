'use strict';


import modelMole from './mole.js';
import modelMaze from './maze.js';
import Type from './types.js';
import Model from './myModel/index.js';
import Query from './myQuery/index.js';

/**
 * the state of the whole page.
 * @type {Model}
 */
const router = new Model({
    data: {
        /**
         * isMaze === true, when the current game is the Maze.
         * Otherwise, the current game is the Mole.
         */
        isMaze: true
    }
});

/**
 * The Game Switcher.
 */
router.$watch('isMaze', function (newValue, oldValue) {
    if (newValue) {
        // mole ==> maze
        Query('#maze').removeClass('hidden');
        Query('#mole').addClass('hidden');
        modelMaze.gameState = Type.Unstarted;
    } else {
        // maze ==> mole
        Query('#mole').removeClass('hidden');
        Query('#maze').addClass('hidden');
        modelMole.gameState = Type.Unstarted;
    }
});

/**
 * The navigation event of the single page.
 */
Query('#maze')
    .removeClass('hidden')
    .on('click', e => {
        if (e.target.id === 'next') {
            router.isMaze = false;
        }
    });


Query('#mole')
    .addClass('hidden')
    .on('click', e => {
        if (e.target.id === 'pre') {
            router.isMaze = true;
        }
    });