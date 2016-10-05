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
 * Add Events
 */
Hzy('#panel').on('click', e => {
    if (model.input === '0') model.input = '';
    if (model.isEqualed) {
        normalizeStyle(model);
        model.isEqualed = false;
    }
    addChar(model, Type[e.target.dataset['directive']]);
});

/**
 * Observe the Model, Update the View when the model's data change!
 */
model.$watch('output', function (newValue, oldValue) {
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