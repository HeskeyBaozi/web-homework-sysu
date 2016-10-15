'use strict';

import Model from './myModel/index.js';
import Query from './myQuery/index.js';
import {hasClass, addClass, removeClass, addClassTemp} from  './myQuery/helper.js';
import {rnd} from './util.js';
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
Query('#mole-start').on('click', e => {
    e.preventDefault();
    if (model.gameState !== Type.Pending) {
        model.gameState = Type.Pending;
    } else {
        model.gameState = Type.Over;
    }
});

/**
 * While playing the game, if you click on the highlight box,
 * you hit it. and then you will get score.
 */
Query('#mole-playground').on('click', e => {
    e.preventDefault();
    if (model.gameState === Type.Pending) {
        if (hasClass.call(e.target, 'highlight')) {
            model.hasHit = true; // trigger the callback of the Watcher of the 'hasHit'
            model.score += 1 + Math.round(model.combo / 2);
            model.combo += 1;
            selectHole(model);

            /**
             * the style of the box will change if you hit it.
             */
            addClassTemp(e.target, ['hit-on', 'highlight'], 500);
        } else {
            model.score -= 1;
            model.combo = 0;
            model.hasHit = false;
        }
    }
});

/**
 * Watch the state of the game
 */
model.$watch('gameState', function (newValue, oldValue) {
    switch (newValue) {
        case Type.Pending:
            /**
             * normalize the game data.
             */
            this.time = 30;
            this.score = 0;
            this.combo = 0;
            this.button = 'Stop!';
            this.message = 'Hit the Mouse with RedPick Color!';
            new Promise((resolve, reject) => {

                /**
                 * Time decreasing
                 * @type {number}
                 */
                const timeUID = setInterval(() => {
                    this.time--;
                    if (this.time <= 0 || this.gameState === Type.Unstarted) {
                        resolve(timeUID);
                    }
                }, 1000);

                selectHole(this);

            }).then((timeUID) => {
                /**
                 * clear all the timer, the game is over
                 */
                clearInterval(timeUID);
                if (this.gameState === Type.Pending)
                    this.gameState = Type.Over;
                if (this.currentHole) {
                    removeClass.call(this.currentHole, 'highlight');
                }
            });
            break;

        case Type.Over:
            /**
             * normalize the game data.
             */
            this.time = 0;
            this.button = 'Start!!';
            this.message = `Nice! ${this.score} points!!`;
            break;

        case Type.Unstarted:
            this.time = 30;
            this.button = 'Start!!';
            this.score = this.combo = 0;
            this.message = 'Welcome to play Mole!!';
    }
});

/**
 * Watch the combo.
 * p.s If you get more than combo, the font will turn into red and get bonus points.
 */
model.$watch('combo', function (newValue, oldValue) {
    const ComboEle = Query('#combo');
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
        removeClass.call(this.currentHole, 'highlight');
        this.currentHole = null;
        this.hasHit = false;
    }
});

/**
 * Select the model
 * @param model {model}
 */
function selectHole(model) {
    model.currentHole = model.maps[rnd(0, model.maps.length - 1)];
    /**
     * highlight the box, and then check whether you've hit it.
     */
    addClass.call(model.currentHole, 'highlight');
}

export default model;