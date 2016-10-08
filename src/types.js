'use strict';

import Hzy from './myQuery.js';

/**
 * Regular Expressions collections used to delete chars.
 * @type {{trigonometricFunction: RegExp, logFunction: RegExp, operation: RegExp, number: RegExp}}
 */
const mathRegExp = {
    trigonometricFunction: /cos\($|sin\($|tan\($/,
    logFunction: /lg\($|ln\($/,
    operation: /\+$|\-$|\*$|\/$/,
    number: /[0]$/,
};

export default {
    factorial: '!',
    power: '^',
    root: '√',

    pi: 'π',
    e: 'e',

    sin: 'sin(',
    cos: 'cos(',
    tan: 'tan(',

    left: '(',
    right: ')',

    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0',

    plus: minusInput(mathRegExp.operation, '+'),
    minus: minusInput(mathRegExp.operation, '-'),
    multiply: minusInput(mathRegExp.operation, '*'),
    divide: minusInput(mathRegExp.operation, '/'),

    point: '.',
    ln: 'ln(',
    lg: 'lg(',

    eq: onEqual,
    backspace: onDelete,

    ce(){
        this.input = '0';
    }
};

/**
 * delete a char before add a char
 * @param reg {RegExp}
 * @param stringAdded {string}
 * @return {Function}
 */
function minusInput(reg, stringAdded) {
    return function () {
        let result = reg.test(this.input)
            ? this.input.slice(0, this.input.length - 1)
            : this.input;

        this.input = result + stringAdded;
    };
}

/**
 * when user clicks the eq block
 * this <===> model
 */
function onEqual() {
    this.isEqualed = true;
    Hzy('#input').addClass('low-light');
    Hzy('#input-quick').text(this.input ? `=${this.result}` : `0`).addClass('high-light');
    this.output += this.input ? `${this.input} = ${this.result}\n` : '0=0\n';
}

/**
 * when user clicks the backspace
 * this <===> model
 */
function onDelete() {
    if (this.input === '') {
        this.input = '0';
        return;
    }
    if (mathRegExp.trigonometricFunction.test(this.input)) {
        this.input = this.input.slice(0, this.input.length - 4);
    } else if (mathRegExp.logFunction.test(this.input)) {
        this.input = this.input.slice(0, this.input.length - 3);
    } else {
        this.input = this.input.slice(0, this.input.length - 1);
    }
}
