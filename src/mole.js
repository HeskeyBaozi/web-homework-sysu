'use strict';

import Model from './myModel/index.js';
import $ from './myQuery/index.js';
import {addClass, removeClass, hasClass} from  './myQuery/helper.js';
import Type from './types.js';

export const model = new Model({
    target: '#mole',
    data: {
        time: 30,
        score: 0,
        combo: 0,
        internalTime: 1000,
        button: 'Start!!',
        message: 'Welcome to play Mole!!',
        maps: Array.from(document.querySelectorAll('.block')),
        gameState: Type.Unstarted
    }
});

model.$watch('gameState', function (newValue, oldValue) {
    switch (newValue) {
        case Type.Pending:
            this.time = 30;
            this.score = 0;
            this.combo = 0;
            this.message = 'Hit the Mouse with RedPick Color!';
            new Promise((resolve, reject) => {

                const timeUID = setInterval(() => {
                    this.time--;
                }, 1000);

                const randomUID = setInterval(() => {
                    addClassTemp(this.maps[rnd(0, this.maps.length - 1)],
                        'highlight', this.internalTime, addClass, removeClass);
                }, this.internalTime);

                setTimeout(() => {
                    resolve({timeUID, randomUID});
                }, 30000);

            }).then(({timeUID, randomUID}) => {
                clearInterval(timeUID);
                clearInterval(randomUID);
                this.gameState = Type.Over;
            });
            break;

        case Type.Over:
            this.time = 0;
            this.message = `You have got the Points: ${this.score}`;
            break;
    }
});

model.$watch('combo', function (newValue, oldValue) {
    const ComboEle = $('#combo');
    if (newValue >= 10) {
        ComboEle.addClass('great');
    } else {
        ComboEle.removeClass('great');
    }
});

$('#mole-playground').on('click', e => {
    e.preventDefault();
    if (model.gameState === Type.Pending) {
        if (hasClass.call(e.target, 'highlight')) {
            model.score += 1 + Math.round(model.combo / 2);
            model.combo += 1;
            addClassTemp(e.target, 'hit-on', this.internalTime, addClass, removeClass);
            removeClass.call(e.target, 'highlight');
        } else {
            model.score -= 1;
            model.combo = 0;
        }
    }
});

$('#mole-start').on('click', e => {
    e.preventDefault();
    model.gameState = Type.Pending;
});

function addClassTemp(element, className, time, addClass, removeClass) {
    return new Promise((resolve, reject) => {
        addClass.call(element, className);
        setTimeout(() => {
            resolve(element);
        }, time);
    }).then(ele => {
        removeClass.call(ele, className);
    });
}

function rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
}