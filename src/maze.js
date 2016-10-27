'use strict';

import $ from  'jquery';
import Model from './myModel/index.js';
import Type from './types.js';
import _ from 'lodash';

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
$('.start')
    .on('mouseover', _.throttle(() => {
        model.gameState = Type.Pending;
    }, 50));


/**
 * Check if you are cheating.
 */
$('.end')
    .on('mouseenter', _.throttle(e => {
        if ($(e.relatedTarget).hasClass('container'))
            model.isCheating = true;
        if (model.gameState !== Type.Pending)
            handleCheatingWhenGetEnter(model);
    }, 50));


function handleCheatingWhenGetEnter(model) {
    _.assign(model, {
        isCheating: true,
        gameState: Type.Win
    });
}

/**
 * When you're playing the game,
 * if you hit the wall careless, you'll lose.
 * And then the wall you hit will be clear to recognize.
 */
$('.playground')
    .on('mousemove', _.throttle(e => {
        if (model.gameState !== Type.Pending) return;
        loopChecking(model, $(e.target));
    }, 50));

function loopChecking(model, $target) {
    if ($target.hasClass('wall')) {
        handleWall(model, $target);
    } else if ($target.hasClass('end')) model.gameState = Type.Win;
}

function handleWall(model, $target) {
    model.gameState = Type.Lose;
    $target.addClass('highlight');
    _.delay(() => $target.removeClass('highlight'), 2000);
}


/**
 * Watch the state of the game,
 * display different message when there're different game's state.
 */
model.$watch('gameState', function (newValue, oldValue) {
    switcher(this, newValue, $('.playground').removeClass('maze-pending'));
});

function switcher(model, value, $content) {
    switch (value) {
        case Type.Pending:
            handleBeginningGame(model, $content);
            break;
        case Type.Win:
            model.message = model.isCheating ? `Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!` : 'You Win!';
            break;
        default:
            model.message = value === Type.Lose ? 'You Lose!' : 'Welcome to Play the Maze!!!';
    }
}

function handleBeginningGame(model, $content) {
    model.message = 'The Game have been started!';
    model.isCheating = false;
    $content.addClass('maze-pending');
}
export default model;