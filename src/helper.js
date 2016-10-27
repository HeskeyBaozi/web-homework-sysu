'use strict';

import $ from 'jquery';

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
    try {
        model.result = valueGetter();
        $('#input-quick').text(typeof model.result === 'function'
            ? 'Please enter number'
            : (model.result ? `${normalizedExpression} = ${model.result}` : ''));
    } catch (error) {
        model.result = 'Syntax Error :(';
        $('#input-quick').text(model.result);
    }
}