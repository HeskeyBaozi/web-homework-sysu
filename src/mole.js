'use strict';

import Model from './myModel/index.js';
import Query from './myQuery/index.js';
import {hasClass, addClassTemp} from  './myQuery/helper.js';
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
        maps: Array.from(document.querySelectorAll('.block')), // the nodeList of the selected block and convert to array.
        gameState: Type.Unstarted, // the state of the game
        hasHit: false
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
            model.hasHit = true;
            model.score += 1 + Math.round(model.combo / 2);
            model.combo += 1;

            /**
             * the style of the box will change if you hit it.
             */
            addClassTemp(e.target, ['hit-on', 'highlight'], 500);
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
                }, 1000);

                /**
                 * select the box randomly
                 * @type {number}
                 */
                const randomUID = setInterval(() => {
                    const selectedNode = this.maps[rnd(0, this.maps.length - 1)];

                    /**
                     * highlight the box, and then check whether you've hit it.
                     * if you didn't hit it, your score will decrease.
                     */
                    addClassTemp(selectedNode, 'highlight', this.internalTime)
                        .then(() => {
                            if (!this.hasHit && this.gameState === Type.Pending) {
                                this.score -= 1;
                                this.combo = 0;
                            }
                            this.hasHit = false;
                        });

                    if (this.time <= 0) {
                        this.time = 0;
                        resolve({timeUID, randomUID});
                    }
                }, this.internalTime);

                setTimeout(() => {
                    resolve({timeUID, randomUID});
                }, 30000);

            }).then(({timeUID, randomUID}) => {
                /**
                 * clear all the timer, the game is over
                 */
                clearInterval(timeUID);
                clearInterval(randomUID);
                this.gameState = Type.Over;
            });
            break;

        case Type.Over:
            /**
             * normalize the game data.
             */
            this.time = 0;
            this.button = 'Start!!';
            this.message = `You have got the Points: ${this.score}`;
            break;
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

export default model;