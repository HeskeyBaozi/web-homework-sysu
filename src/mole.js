'use strict';

import Model from './myModel/index.js';
import $ from 'jquery';
import _ from 'lodash';
import Type from './types.js';

/**
 * The model of the game: Mole
 * @type {Model}
 */
const model = new Model({
    target: '#mole',
    data: {
        time: 30,    // the time left
        score: 0,    // the score you get
        combo: 0,    // the combo you make
        internalTime: 1200, // the time interval or the frequency of the mouse appear, 1000ms === 1s
        button: 'Start!!',  // the button value of the start button
        message: 'Welcome to play Mole!!', // the message remainder
        maps: // the nodeList of the selected block and convert to array.
            Array.from(document.querySelectorAll('.block')),
        gameState: Type.Unstarted, // the state of the game
        hasHit: false, // is the current box has been hit ?
        currentHole: null // the current box of the game
    }
});

/**
 * When you click on the start button, start the game.
 */
$('#mole-start').click(e => {
    e.preventDefault();
    model.gameState = model.gameState !== Type.Pending ? Type.Pending : Type.Over;
});

/**
 * While playing the game, if you click on the highlight box,
 * you hit it. and then you will get score.
 */
$('#mole-playground').click(e => {
    e.preventDefault();
    if (model.gameState !== Type.Pending) return;
    handleHittingHole(model, $(e.target));
});

function handleHittingHole(model, $hole) {
    if ($hole.hasClass('highlight')) {
        handleHitBlock(model, $hole);
        selectHole(model);
    } else handleUnhitBlock(model);
}

function handleHitBlock(model, $target) {
    _.assign(model, {
        hasHit: true, // trigger the callback of the Watcher of the 'hasHit'
        score: model.score + 1 + _.floor(model.combo / 2),
        combo: model.combo + 1
    });
    $target.removeClass('highlight').addClass('hit-on');
    _.delay(() => $target.removeClass('hit-on'), 500);
}

function handleUnhitBlock(model) {
    _.assign(model, {
        score: model.score - 1,
        combo: 0,
        hasHit: false
    });
}

/**
 * Watch the state of the game
 */
model.$watch('gameState', function (newValue, oldValue) {
    switch (newValue) {
        case Type.Pending:
            startGame(this);
            break;
        case Type.Over:
            handleGameOver(this);
            break;
        case Type.Unstarted:
            handleUnstartedGame(this);
    }
});

function startGame(model) {
    /**
     * normalize the game data.
     */
    handleBeginningGame(model);
    new Promise((resolve, reject) => {
        setContinuingTimeAsync(model, resolve);
        selectHole(model);
    }).then((timeUID) => timeOut(timeUID, model));
}

function handleBeginningGame(model) {
    _.assign(model, {
        time: 30,
        score: 0,
        combo: 0,
        button: 'Stop!',
        message: 'Hit the Mouse with RedPick Color!'
    });
}

function setContinuingTimeAsync(model, callback) {
    /**
     * Time decreasing
     * @type {number}
     */
    const timeUID = setInterval(() => {
        model.time--;
        if (model.time <= 0 || model.gameState === Type.Unstarted) {
            callback(timeUID);
        }
    }, 1000);
}

function timeOut(timeUID, model) {
    /**
     * clear all the timer, the game is over
     */
    clearInterval(timeUID);
    _.assign(model, {
        time: 0,
        gameState: model.gameState === Type.Pending ? Type.Over : model.gameState
    });
    if (model.currentHole)
        model.currentHole.removeClass('highlight');
}

function handleGameOver(model) {
    /**
     * normalize the game data.
     */
    _.assign(model, {
        time: 0,
        button: 'Start!!',
        message: `Nice! ${model.score} points!!`
    });
}

function handleUnstartedGame(model) {
    _.assign(model, {
        time: 30,
        button: 'Start!!',
        message: 'Welcome to play Mole!!',
        score: 0,
        combo: 0
    });
}

/**
 * Watch the combo.
 * p.s If you get more than combo, the font will turn into red and get bonus points.
 */
model.$watch('combo', function (newValue, oldValue) {
    const ComboEle = $('#combo');
    if (newValue >= 10) {
        ComboEle.addClass('great');
    } else {
        ComboEle.removeClass('great');
    }
});

/**
 * Watch the prop 'hasHit',
 * if you has hit the box, reselect another box.
 */
model.$watch('hasHit', function (newValue, oldValue) {
    if (newValue) {
        selectHole(this);
        this.currentHole.removeClass('highlight');
        this.currentHole = null;
        this.hasHit = false;
    }
});

/**
 * Select the model
 * @param model {model}
 */
function selectHole(model) {
    model.currentHole = $(_.sample(model.maps)).addClass('highlight');
}

export default model;