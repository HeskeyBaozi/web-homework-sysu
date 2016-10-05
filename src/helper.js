'use strict';

import Hzy from './myQuery.js';

/**
 * add a char to the calculator screen!
 * @param model {model}
 * @param directive {string|function}
 */
export function addChar(model, directive) {
    if (typeof directive === 'string') {
        model.input += directive;
    } else if (typeof directive === 'function') {
        directive.call(model);
    } else {
        console.warn('cannot parse this directive:', directive);
    }
}

/**
 * EveryTime show the result of the expression on the screen!
 * @param model {model}
 * @param normalizedExpression {string}
 * @param valueGetter {function} return the value of the expression!
 */
export function showResult(model, normalizedExpression, valueGetter) {
    let result = null;
    try {
        model.result = result = valueGetter();
        if (typeof result === 'function') {
            Hzy('#input-quick').text('Please enter number');
        } else if (result) {
            Hzy('#input-quick').text(`${normalizedExpression} = ${result}`);
        } else {
            Hzy('#input-quick').text('');
        }
    } catch (e) {
        model.result = 'Syntax Error :(';
        Hzy('#input-quick').text(model.result);
    }
}