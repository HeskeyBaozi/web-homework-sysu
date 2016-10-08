'use strict';

import Hzy from './myQuery.js';
import Model from './myModel/index.js';
import Type from './types.js';
import parseExpression from './parser.js';
import normalizeStyle from './normalize/style.js';
import normalizeExpression from './normalize/expression.js';
import {addChar, showResult} from './helper.js';

/**
 * Create a model of the screen in the calculator
 * @type {Model}
 */
const model = new Model({
    data: {
        output: '',
        input: '0',
        isEqualed: false
    }
});

/**
 * Add and Bind Events
 */
Hzy('#panel').on('click', e => {
    if (model.input === '0') model.input = ''; // normalize zero
    if (model.isEqualed) {
        normalizeStyle(model);
        model.isEqualed = false;
    }
    addChar(model, Type[e.target.dataset['directive']]);
});

/**
 * Bind the data with the View!!!
 * Observe the Model, Update the View when the model's data change!
 */
model.$watch('output', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        Hzy('#output').text(newValue.trim());
    }
});

model.$watch('input', function (newValue, oldValue) {
    if (newValue !== oldValue) {
        Hzy('#input').text(newValue);
        const normalizedExpression = normalizeExpression(newValue);
        const getter = parseExpression(normalizedExpression);
        showResult(this, normalizedExpression, getter);
    }
});

model.$watch('isEqualed', function (newValue, oldValue) {
    if (newValue !== oldValue) {
        if (newValue === true) {
            Hzy('#input').addClass('low-light');
            Hzy('#input-quick').text(this.input ? `=${this.result}` : `0`).addClass('high-light');
        }
    }
});