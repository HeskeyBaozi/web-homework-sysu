'use strict';


import modelMole from './mole.js';
import modelMaze from './maze.js';
import Model from './myModel/index.js';
import $ from './myQuery/index.js';


const router = new Model({
    data: {
        isMaze: true
    }
});

router.$watch('isMaze', function (newValue, oldValue) {
    if (newValue) {
        // mole ==> maze
        $('#maze').removeClass('hidden');
        $('#mole').addClass('hidden');
    } else {
        // maze ==> mole
        $('#mole').removeClass('hidden');
        $('#maze').addClass('hidden');
    }
});

$('#maze')
    .removeClass('hidden')
    .on('click', e => {
        if (e.target.id === 'next') {
            router.isMaze = false;
        }
    });


$('#mole')
    .addClass('hidden')
    .on('click', e => {
        if (e.target.id === 'pre') {
            router.isMaze = true;
        }
    });