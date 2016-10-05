'use strict';

import {factor} from './util.js';

const Operation = {
    math: [Math.sin, Math.cos, Math.tan, Math.log10, Math.log, Math.E, Math.PI, Math.pow, Math.sqrt, factor],
    string: ['sin', 'cos', 'tan', 'lg', 'ln', 'e', 'π', 'pow', 'sqrt', 'factor']
};

/**
 * convert the expression into a function that returns the value of the expression.
 * @param expression {string}
 * @return {Function} get the value if called!
 */
export default expression => () => {
    return new Function(...Operation.string, `return ${expression};`).apply(null, Operation.math);
}