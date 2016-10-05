'use strict';

import Hzy from '../myQuery.js';

export default function normalizeStyle(model) {
    return [model, normalizeInput, normalizeClass, normalizeOutput]
        .reduce((model, wrapper) => wrapper(model));
}

function normalizeClass(model) {
    Hzy('#input-quick').removeClass('high-light');
    Hzy('#input').removeClass('low-light');
    return model;
}

function normalizeOutput(model) {
    let outputArray = model.output.split('\n');
    if (outputArray.length > 5) {
        outputArray = outputArray.slice(1, outputArray.length);
    }
    model.output = outputArray.join('\n');
    return model;
}

function normalizeInput(model) {
    model.input = '';
    return model;
}